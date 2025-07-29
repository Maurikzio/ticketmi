import { Prisma } from "@prisma/client";

export type CommentWithMetadata = Prisma.CommentGetPayload<{
  include: {
    author: {
      select: {
        id: true,
        userName: true,
        userLastname: true
      }
    },
    attachments: true
  }
}>


export interface CommentFormState {
  message?: string;
  status?: "success" | "error" | "idle";
  errors?: {
    content?: string[]
  }
  data?: unknown
}
