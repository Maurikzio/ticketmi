"use server"

import { z } from "zod"
import { ACCEPTED_FILES, AttachmentFormState, FILE_MAX_SIZE } from "../definitions"
import { requireAuth } from "@/features/auth/utils/require-auth"
import { prisma } from "@/lib/prisma"
import { AttachmentEntity, Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { ticketPath } from "@/paths"
import { sizeInMb } from "../utils/size"
import { s3 } from "@/lib/aws"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { generateS3Key } from "../utils/generate-s3-key"

const createAttachmentsSchema = z.object({
  files: z.custom<FileList>()
    .transform((files) => Array.from(files))
    .transform((files) => files.filter((file) => file.size > 0))
    .refine(
      (files) => files.every((file) => sizeInMb(file.size) <= FILE_MAX_SIZE),
      `The maximum file size is ${FILE_MAX_SIZE}MB`
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_FILES.includes(file.type)),
      'File type is not supported'
    )
    .refine((files) => files.length !== 0, "File is required")
})

const createTicketAttachment = async (ticketId: string, files: File[], userId: string): Promise<AttachmentFormState> => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  })

  if (!ticket) {
    return {
      message: "Ticket not found",
      status: "error"
    }
  }

  if (ticket.profileId !== userId) {
    return {
      message: "Not the owner of this ticket",
      status: "error",
    }
  }

  try {

    for (const file of files) {
      //create buffer
      const buffer = await Buffer.from(await file.arrayBuffer());
      //upload to S3
      const attachment = await prisma.attachment.create({
        data: {
          name: file.name,
          entity: AttachmentEntity.TICKET,
          ticketId
        }
      })
      //create database reference to S3 file
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          // Key: attachment.id,
          Key: generateS3Key({
            entity: "TICKET",
            entityId: ticketId,
            organizationId: ticket.organizationId,
            fileName: file.name,
            attachmentId: attachment.id
          }),
          Body: buffer,
          ContentType: file.type
        })
      )
    }

    revalidatePath(ticketPath(ticket.id))
    return {
      message: "Attachment(s) for ticket uploaded successfully",
      status: "success",
    }
  } catch (error) {
    const message = error instanceof Prisma.PrismaClientValidationError
      ? "Database validation error"
      : error instanceof Error ? error.message : "Something went wrong"
    return {
      status: "error",
      message,
    }
  }
}

const createCommentAttachment = async (commentId: string, files: File[], userId: string): Promise<AttachmentFormState> => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      id: true,
      authorId: true,
      ticket: {
        select: {
          id: true,
          profileId: true,
          organizationId: true,
        }
      }
    }
  })

  if (!comment) {
    return {
      message: "Comment not found",
      status: "error"
    }
  }

  if (comment.authorId !== userId) {
    return {
      message: "Not authorized",
      status: "error"
    }
  }

  try {
    for (const file of files) {
      //create buffer
      const buffer = await Buffer.from(await file.arrayBuffer());
      //upload to S3
      const attachment = await prisma.attachment.create({
        data: {
          name: file.name,
          entity: AttachmentEntity.COMMENT,
          commentId
        }
      })
      //create database reference to S3 file
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          // Key: attachment.id,
          Key: generateS3Key({
            entity: "COMMENT",
            entityId: commentId,
            organizationId: comment.ticket.organizationId,
            fileName: file.name,
            attachmentId: attachment.id
          }),
          Body: buffer,
          ContentType: file.type
        })
      )
    }

    revalidatePath(ticketPath(comment.ticket.id))
    return {
      message: "Attachment(s) for comment uploaded successfully",
      status: "success",
    }
  } catch (error) {
    const message = error instanceof Prisma.PrismaClientValidationError
      ? "Database validation error"
      : error instanceof Error ? error.message : "Something went wrong"
    return {
      status: "error",
      message,
    }
  }
}

export const createAttachments = async (
  entityId: string,
  entity: AttachmentEntity,
  _actionState: AttachmentFormState,
  formData: FormData
): Promise<AttachmentFormState> => {

  const validatedFields = createAttachmentsSchema.safeParse({
    files: formData.getAll("files")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const context = await requireAuth()
  const { files } = validatedFields.data;

  switch (entity) {
    case AttachmentEntity.TICKET:
      return await createTicketAttachment(entityId, files, context.profile.id)

    case AttachmentEntity.TICKET:
      return await createCommentAttachment(entityId, files, context.profile.id)

    default:
      return {
        message: "Invalid entity type",
        status: "error"
      }
  }

}

/**
 * CASE:
 * file sending to aws s3 bucket failed, file stored in DB but not in aws S3.
 * user got the error alert, page was not refreshed/revalidated and attachment record not visible in page
 * after user refreshes the page the attachment is visible (but only the record from DB not from AWS S3)
 */
