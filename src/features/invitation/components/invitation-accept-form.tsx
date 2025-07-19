"use client"

import SubmitButton from "@/components/form/submit-button-iconed";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { acceptInvitation } from "../actions/accept-invitation";

interface InvitationAcceptFormProps {
  tokenId: string;
}

const InvitationAcceptForm = ({ tokenId }: InvitationAcceptFormProps) => {
  const initialActionState = { message: "", errors: {}, status: "idle" }
  const [actionState, action] = useActionState(acceptInvitation.bind(null, tokenId), initialActionState)

  useEffect(() => {
    if (actionState.status === "success") {
      toast.error(actionState.message || "Something went wrong");
    } else if (actionState.status === "error") {
      toast.error(actionState.message || "Something went wrong");
    }
  }, [actionState])

  return (
    <form action={action} className="flex flex-col gap-4">
      <SubmitButton label="Accept" />
    </form>
  )
}

export default InvitationAcceptForm;
