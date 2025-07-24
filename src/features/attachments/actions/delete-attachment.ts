"use server"

import { requireAuth } from "@/features/auth/utils/require-auth"
import { inngest } from "@/lib/inngest"
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

    await inngest.send({
      name: "app/attachment.deleted",
      data: {
        attachmentId: attachment.id,
        organizationId: attachment.ticket.organizationId,
        ticketId: attachment.ticketId,
        fileName: attachment.name
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
