"use server"

import { prisma } from "@/lib/prisma"

export const getComments = async (ticketId: string, offset?: number) => {
  const skip = offset ?? 0;
  const take = 2;

  const where = {
    ticketId
  };

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      skip,
      take,
      include: {
        author: {
          select: {
            id: true,
            userName: true,
            userLastname: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
    }),
    prisma.comment.count({ where })
  ])

  return {
    list: comments,
    metadata: {
      count,
      hasNextPage: count > skip + take,
    }
  }

}
