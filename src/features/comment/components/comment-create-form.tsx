"use client"

import { Textarea } from "@/components/ui/textarea"
import { createComment } from "../actions/create-comment"
import SubmitButton from "@/components/form/submit-button"
import { useActionState, useMemo } from "react"
import { CommentFormState } from "../definitions"
import { toast } from "sonner";
import useActionFeedback from "@/components/form/hooks/use-action-feedback"

interface CommentCreateformProps {
  ticketId: string
}

const CommentCreateform = ({ ticketId }: CommentCreateformProps) => {
  const initialState: CommentFormState = { message: "", errors: {}, status: "idle" }
  const [actionState, action] = useActionState(createComment.bind(null, ticketId), initialState)

  const options = useMemo(() => ({
    onSuccess() {
      toast.success(actionState.message || "Success!");
    },
    onError() {
      toast.error(actionState.message || "Something went wrong");
    }
  }), [actionState.message])

  useActionFeedback(actionState.status as string, options)

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
