"use client"

import useActionFeedback from "@/components/form/hooks/use-action-feedback";
import SubmitButton from "@/components/form/submit-button-iconed";
import { Ban, Check } from "lucide-react";
import { useActionState, useMemo } from "react";
import { toast } from "sonner";
import { togglePermission } from "../actions/toggle-permission";

interface PermissionToggleProps {
  profileId: string;
  organizationId: string;
  permissionKey: "canDeleteTicket";
  permissionValue: boolean;
}

const PermissionToggle = ({ profileId, organizationId, permissionKey, permissionValue }: PermissionToggleProps) => {
  const initialState = { message: "", errors: {}, status: "idle" }
  const [actionState, action] = useActionState(
    togglePermission.bind(null, { profileId, organizationId, permissionKey }),
    initialState
  )


  const options = useMemo(() => ({
    onSuccess() {
      toast.success(actionState.message || "Success!");
    },
    onError() {
      toast.error(actionState.message || "Something went wrong");
    }
  }), [actionState.message])

  useActionFeedback(
    actionState.status as string,
    options
  )
  return (
    <form action={action}>
      <SubmitButton
        icon={permissionValue ? <Check /> : <Ban />}
        size="icon"
        variant={permissionValue ? "secondary" : "outline"}
      />
    </form>
  )
};

export default PermissionToggle;
