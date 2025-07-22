"use client"

import SubmitButton from "@/components/form/submit-button-iconed";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { acceptInvitation } from "../actions/accept-invitation";
import { useRouter } from "next/navigation";

interface InvitationAcceptFormProps {
  tokenId: string;
}

const InvitationAcceptForm = ({ tokenId }: InvitationAcceptFormProps) => {
  const initialActionState = { message: "", errors: {}, status: "idle", redirectTo: "" }
  const [actionState, action] = useActionState(acceptInvitation.bind(null, tokenId), initialActionState)
  const router = useRouter()

  useEffect(() => {
    if (actionState.status === "success") {
      toast.error(actionState.message || "Success");
      if (actionState.redirectTo) {
        router.push(actionState.redirectTo)
      }
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
