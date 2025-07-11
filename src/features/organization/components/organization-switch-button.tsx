'use client'

import { useActionState, useEffect } from "react"
import { switchOrganization } from "../actions/switch-organization"
import { toast } from "sonner"

interface OrganizationSwitchButtonProps {
  organizationId: string
  trigger: React.ReactNode
}

const OrganizationSwitchButton = ({ organizationId, trigger }: OrganizationSwitchButtonProps) => {
  const initialState = { message: "", errors: {}, status: "idle" }
  const [actionState, action] = useActionState(switchOrganization.bind(null, organizationId), initialState)

  useEffect(() => {
    if (actionState.status === 'success') {
      toast.success(actionState.message)
    } else if (actionState.status === "error") {
      toast.error(actionState.message)
    }
  }, [actionState])


  return (
    <form action={action}>
      {trigger}
    </form>
  )
}

export default OrganizationSwitchButton;
