import { prisma } from "@/lib/prisma"
import { AttachmentEntity } from "@prisma/client"

export const getAttachments = async (entityId: string, entity: AttachmentEntity) => {
  switch (entity) {
    case "TICKET":
      return await prisma.attachment.findMany({
        where: {
          ticketId: entityId,
          entity
        }
      })
    case "COMMENT":
      return await prisma.attachment.findMany({
        where: {
          commentId: entityId,
          entity
        }
      })
    default:
      return []
  }
}
