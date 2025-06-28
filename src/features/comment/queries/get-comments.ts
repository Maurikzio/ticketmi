import { prisma } from "@/lib/prisma"

export const getComments = async (ticketId: string) => {
  return prisma.comment.findMany({
    where: {
      ticketId
    },
    include: {
      author: {
        select: {
          userName: true,
          userLastname: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
}
