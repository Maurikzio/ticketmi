"use server"

import { requireProfile } from "@/features/auth/utils/requireProfile";
import { prisma } from "@/lib/prisma";
import { signInPath, ticketPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteComment(commentId: string) {
  const profileData = await requireProfile()
  if (!profileData) {
    redirect(signInPath)
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId
    }
  })
  if (!comment || (profileData.profile.id !== comment.authorId)) {
    return {
      message: "Not authorized",
      status: "error",
    }
  }

  try {
    await prisma.comment.delete({ where: { id: commentId } })
    revalidatePath(ticketPath(comment.ticketId))
    return {
      message: 'Comment deleted',
      status: "success"
    }
  } catch (error) {
    console.error(error)
    return {
      message: error instanceof Error ? error.message : "Something went wrong!",
      status: "error",
    }
  }
}
