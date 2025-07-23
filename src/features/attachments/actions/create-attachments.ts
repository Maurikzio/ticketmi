"use server"

import { z } from "zod"
import { ACCEPTED_FILES, AttachmentFormState, FILE_MAX_SIZE } from "../definitions"
import { requireAuth } from "@/features/auth/utils/require-auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { ticketPath } from "@/paths"
import { sizeInMb } from "../utils/size"

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
      //create database reference to S3 file

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
