"use server"

import { z } from "zod"
import { ACCEPTED_FILES, AttachmentFormState, FILE_MAX_SIZE } from "../definitions"
import { requireAuth } from "@/features/auth/utils/require-auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
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

export const createAttachments = async (
  ticketId: string,
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
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId
    }
  })

  if (!ticket) {
    return {
      message: "Ticket not found",
      status: "error",
    }
  }

  if (ticket.profileId !== context.profile.id) {
    return {
      message: "Not the owner of this ticket",
      status: "error",
    }
  }


  try {
    const { files } = validatedFields.data;

    for (const file of files) {
      //create buffer
      const buffer = await Buffer.from(await file.arrayBuffer());
      //upload to S3
      const attachment = await prisma.attachment.create({
        data: {
          name: file.name,
          ticketId
        }
      })
      //create database reference to S3 file
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          // Key: attachment.id,
          Key: generateS3Key({
            ticketId,
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
      message: "Attachment(s) uploaded",
      status: "success",
    }
  } catch (error) {
    const message = error instanceof Prisma.PrismaClientValidationError
      ? "Something went wrong"
      : error instanceof Error ? error.message : "Something went wrong"
    return {
      status: "error",
      message,
    }
  }
}
