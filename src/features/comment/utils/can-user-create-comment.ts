import { prisma } from "@/lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

const canUserCreateComment = async (authorId: string) => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now)

  const commentCount = await prisma.comment.count({
    where: {
      authorId,
      createdAt: {
        gte: monthStart,
        lte: monthEnd,
      }
    }
  });

  return commentCount < 5
}

export default canUserCreateComment;
