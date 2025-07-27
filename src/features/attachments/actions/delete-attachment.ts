"use server"

import { requireAuth } from "@/features/auth/utils/require-auth"
import { inngest } from "@/lib/inngest"
import { prisma } from "@/lib/prisma"
import { AttachmentEntity } from "@prisma/client"

const deleteTicketAttachment = async (attachmentId: string, userId: string) => {
  const attachment = await prisma.attachment.findUnique({
    where: { id: attachmentId },
    select: {
      id: true,
      name: true,
      ticketId: true,
      ticket: {
        select: {
          id: true,
          profileId: true,
          organizationId: true,
        }
      }
    }
  })

  if (!attachment || !attachment.ticket) {
    return {
      status: "error",
      message: "Attachment or ticket not found"
    }
  }

  if (attachment.ticket.profileId !== userId) {
    return {
      status: "error",
      message: "Not authorized to delete this attachment"
    }
  }

  try {
    await prisma.attachment.delete({
      where: { id: attachmentId }
    })

    await inngest.send({
      name: "app/attachment.deleted",
      data: {
        attachmentId: attachment.id,
        organizationId: attachment.ticket.organizationId,
        entityId: attachment.ticket.id,
        entity: AttachmentEntity.TICKET,
        fileName: attachment.name
      }
    })

    return {
      status: "success",
      message: "Ticket attachment deleted successfully"
    }

  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Something went wrong!",
      status: "error",
    }
  }
}

const deleteCommentAttachment = async (attachmentId: string, userId: string) => {
  const attachment = await prisma.attachment.findUnique({
    where: { id: attachmentId },
    select: {
      id: true,
      name: true,
      entity: true,
      commentId: true,
      comment: {
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
      }

    }
  })

  if (!attachment || !attachment.comment) {
    return {
      status: "error",
      message: "Attachment or comment not found"
    }
  }

  const isCommentAuthor = attachment.comment.authorId === userId;
  if (!isCommentAuthor) {
    return {
      status: "error",
      message: "Not authorized to delete this attachment"
    }
  }

  try {
    await prisma.attachment.delete({
      where: { id: attachmentId }
    })

    await inngest.send({
      name: "app/attachment.deleted",
      data: {
        attachmentId: attachment.id,
        organizationId: attachment.comment.ticket.organizationId,
        entityId: attachment.comment.id,
        entity: AttachmentEntity.COMMENT,
        fileName: attachment.name
      }
    })

    return {
      status: "success",
      message: "Comment attachment deleted succesfully"
    }

  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Something went wrong!",
      status: "error",
    }
  }
}

export const deleteAttachment = async (attachmentId: string) => {
  const context = await requireAuth()

  const attachment = await prisma.attachment.findUniqueOrThrow({
    where: {
      id: attachmentId
    },
    select: {
      entity: true,
    }
  })

  if (!attachment) {
    return {
      status: "error",
      message: 'Attachment not found'
    }
  }

  switch (attachment.entity) {
    case AttachmentEntity.TICKET:
      return await deleteTicketAttachment(attachmentId, context.profile.id);

    case AttachmentEntity.COMMENT:
      return await deleteCommentAttachment(attachmentId, context.profile.id)

    default:
      return {
        status: "error",
        message: "Invalid attachment entity type"
      }
  }
}
