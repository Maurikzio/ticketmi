import { Prisma } from "@prisma/client";

export type CommentWithMetadata = Prisma.CommentGetPayload<{
  include: {
    author: {
      select: {
        userName: true,
        userLastname: true
      }
    }
  }
}>


export interface CommentFormState {
  message?: string;
  status?: "success" | "error" | "idle";
  errors?: {
    content?: string[]
  }
}
