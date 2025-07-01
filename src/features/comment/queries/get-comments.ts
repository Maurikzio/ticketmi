"use server"

import { prisma } from "@/lib/prisma"

export const getComments = async (ticketId: string, cursor?: string) => {
  const take = 2;

  const where = {
    ticketId
  };

  const cursorConfig = cursor
    ? { cursor: { id: cursor }, skip: 1 }
    : undefined

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take: take + 1,
      ...cursorConfig,
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

  // El siguiente cursor es el ID del último elemento
  const nextCursor = comments.length > take ? comments[comments.length - 1].id : undefined;
  const hasNextPage = nextCursor !== undefined;

  return {
    list: comments,
    metadata: {
      count,
      hasNextPage,
      nextCursor
    }
  }

}
