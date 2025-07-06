"use client"

import { useActionState, useEffect } from "react";
import { initialCreateOrganizationState } from "../definitions";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/form/submit-button";
import { createOrganization } from "../actions/create-organization";
import { useRouter } from "next/navigation"
import { toast } from "sonner";

const OrganizationCreateForm = () => {
  const router = useRouter();
  const [actionState, action] = useActionState(
    createOrganization,
    initialCreateOrganizationState
  )

  useEffect(() => {
    if (actionState.status === 'success') {
      toast.success(actionState.message)
      router.push("/tickets");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionState])

  return (
    <form action={action} className="flex flex-col gap-4">
      <Input
        name="name"
        placeholder="Name"
      />
      {actionState.errors?.name ? (
        <p className='mt-2 text-sm text-red-500'>
          {actionState.errors.name?.[0]}
        </p>
      ) : null}
      <SubmitButton label="Create" pendingLabel="Creating" />
    </form>
  )
};

export default OrganizationCreateForm;
