"use client"

import { Textarea } from "@/components/ui/textarea"
import { createComment } from "../actions/create-comment"
import SubmitButton from "@/components/form/submit-button"
import { useActionState, useEffect } from "react"
import { CommentFormState, CommentWithMetadata } from "../definitions"
import { toast } from "sonner";

interface CommentCreateformProps {
  ticketId: string
  onSucessAction?: (comment: CommentWithMetadata) => void
}

const CommentCreateform = ({ ticketId, onSucessAction }: CommentCreateformProps) => {
  const initialState: CommentFormState = { message: "", errors: {}, status: "idle" }
  const [actionState, action] = useActionState(createComment.bind(null, ticketId), initialState)

  useEffect(() => {
    if (actionState.status === "success" && actionState.data) {
      onSucessAction?.(actionState.data as CommentWithMetadata)
      toast.error(actionState.message || "Something went wrong");
    } else if (actionState.status === "error") {
      toast.error(actionState.message || "Something went wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionState])

  return (
    <form action={action} className="flex flex-col gap-2">
      <div>
        <Textarea name="content" placeholder="What's on your mind..." />
        {actionState.errors?.content ? (
          <p
            className='mt-2 text-sm text-red-500'
          >
            {actionState.errors.content?.[0]}
          </p>
        ) : null}
      </div>
      <SubmitButton label="Send" pendingLabel="Sending" />
    </form >
  )
}

export default CommentCreateform
