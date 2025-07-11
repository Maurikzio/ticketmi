"use client"

import useActionFeedback from "@/components/form/hooks/use-action-feedback";
import SubmitButton from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useMemo } from "react";
import { toast } from "sonner";
import createProfile from "../actions/create-profile";
import { CrateProfileFormState } from "../definitions";
import { useRouter } from "next/navigation";

const CreateProfileForm = () => {
  const initialState: CrateProfileFormState = { message: "", errors: {}, status: "idle" }
  const [actionState, action] = useActionState(createProfile, initialState)
  const router = useRouter();
  const options = useMemo(() => ({
    onSuccess() {
      toast.success(actionState.message || "Success!");
      router.refresh()
      router.push('/tickets')
    },
    onError() {
      toast.error(actionState.message || "Something went wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [actionState.message])

  useActionFeedback(
    actionState.status as string,
    options
  )

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input
          type="text"
          id="userName"
          name="userName"
          placeholder="John"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Lastname</Label>
        <Input
          type="text"
          id="userLastname"
          name="userLastname"
          placeholder="Doe"
        />
      </div>
      <SubmitButton label="Create" pendingLabel="Creating" />
    </form>
  )
};

export default CreateProfileForm;
