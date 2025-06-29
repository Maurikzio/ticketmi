"use server"

import { prisma } from "@/lib/prisma"
import { signInPath, ticketPath } from "@/paths"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { CommentFormState } from "../definitions"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024)
})

export const createComment = async (ticketId: string, _actionState: CommentFormState, formData: FormData): Promise<CommentFormState> => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect(signInPath)
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id }
  })

  if (!profile) {
    redirect(signInPath)
  }

  const validatedFields = createCommentSchema.safeParse({
    content: formData.get("content")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { content } = validatedFields.data;

  try {
    const comment = await prisma.comment.create({
      data: {
        authorId: profile.id,
        ticketId,
        content
      },
      include: {
        author: {
          select: {
            id: true,
            userName: true,
            userLastname: true
          }
        }
      }
    })
    revalidatePath(ticketPath(ticketId))
    return { message: "Comment created", status: "success", data: comment }
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Something went wrong"
    }
  }

  // revalidatePath(ticketPath(ticketId))
  // return { message: "Comment created", status: "success" }
}
