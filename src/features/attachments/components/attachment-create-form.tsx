"use client"

import { useActionState, useEffect } from "react"
import { toast } from "sonner";
import { ACCEPTED_FILES, AttachmentFormState } from "../definitions";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/form/submit-button-iconed";
import { createAttachments } from "../actions/create-attachments";

interface AttachmentCreateFormProps {
  ticketId: string
}

const AttachmentCreateForm = ({ ticketId }: AttachmentCreateFormProps) => {
  const initialState: AttachmentFormState = { message: "", errors: {}, status: "idle" }
  const [actionState, action] = useActionState(createAttachments.bind(null, ticketId), initialState)

  useEffect(() => {
    if (actionState.status === "success") {
      toast.error(actionState.message || "Success");
    } else if (actionState.status === "error") {
      toast.error(actionState.message || "Something went wrong");
    }
  }, [actionState])

  return (
    <form action={action} className="flex flex-col gap-2">
      <div>
        <Input
          name="files"
          id="files"
          type="file"
          multiple={true}
          accept={ACCEPTED_FILES.join(', ')}
        />
        {actionState.errors?.files ? (
          <p
            className='mt-2 text-sm text-red-500'
          >
            {actionState.errors.files?.[0]}
          </p>
        ) : null}
      </div>
      <SubmitButton label="Upload" />
    </form >
  )
}

export default AttachmentCreateForm
