"use server"

import { requireAuth } from "@/features/auth/utils/require-auth"
import { prisma } from "@/lib/prisma"

export const deleteAttachment = async (id: string) => {
  const context = await requireAuth()

  const attachment = await prisma.attachment.findUniqueOrThrow({
    where: {
      id
    },
    include: {
      ticket: true
    }
  })

  if (context.profile.id !== attachment.ticket.profileId) {
    return {
      status: "error",
      message: "Not authorized"
    }
  }

  try {
    await prisma.attachment.delete({
      where: {
        id
      }
    })
    return {
      message: 'Attachment deleted',
      status: "success"
    }
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Something went wrong!",
      status: "error",
    }
  }
}
