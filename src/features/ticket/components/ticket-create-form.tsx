'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import createTicket from "../actions/create-ticket";
import SubmitButton from "@/components/form/submit-button";
import { useActionState, useMemo } from "react";
import { FormState } from "../definitions";
import { toast } from "sonner";
import useActionFeedback from "@/components/form/hooks/use-action-feedback";
import DatePicker from "@/components/date-picker";

const TicketCreateForm = () => {
  const initialState: FormState = { message: "", errors: {}, status: "idle", }
  const [actionState, action] = useActionState(createTicket, initialState);

  // We have to memoize options since it was a new object on every render
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
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" placeholder="Title" />
        {actionState.errors?.title ? (
          actionState.errors.title.map(error => (
            <p
              key={error}
              className='mt-2 text-sm text-red-500'
            >{error}</p>
          ))
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea placeholder="Type the ticket content here." id="content" name="content" />
        {actionState.errors?.content ? (
          actionState.errors.content.map(error => (
            <p
              key={error}
              className='mt-2 text-sm text-red-500'
            >{error}</p>
          ))
        ) : null}
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-2">
          {/* <Label htmlFor="deadline">Dealine</Label>
          <Input type="date" id="deadline" name="deadline" /> */}
          <DatePicker
            id="deadline"
            name="deadline"
            label="Deadline"
          />
          {actionState.errors?.deadline ? (
            actionState.errors.deadline.map(error => (
              <p
                key={error}
                className='mt-2 text-sm text-red-500'
              >{error}</p>
            ))
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input type="number" id="bounty" name="bounty" />
          {actionState.errors?.bounty ? (
            actionState.errors.bounty.map(error => (
              <p
                key={error}
                className='mt-2 text-sm text-red-500'
              >{error}</p>
            ))
          ) : null}
        </div>
      </div>

      <SubmitButton label="Create" pendingLabel="Creating" />
      {/* <p className="text-sm text-yellow-500">{actionState.message}</p> */}
    </form>
  )
}

export default TicketCreateForm;
