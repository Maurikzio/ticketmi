"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@prisma/client";
import updateTicket from "../actions/update-ticket";
import SubmitButton from "@/components/form/submit-button";
import { useActionState, useMemo } from "react";
import { FormState } from "../definitions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useActionFeedback from "@/components/form/hooks/use-action-feedback";
import { ticketPath } from "@/paths";
import { fromCent } from "@/utils/currency";
import DatePicker from "@/components/date-picker";

interface TicketUpdateFormProps {
  ticket: Ticket
}

const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {
  const router = useRouter();
  const initialState: FormState = { message: "", status: "idle", errors: {}, values: {} }
  const updateTicketWithId = updateTicket.bind(null, ticket.id);
  const [actionState, action] = useActionState(
    updateTicketWithId,
    initialState
  )
  // We have to memoize options since it was a new object on every render
  const options = useMemo(() => ({
    onSuccess() {
      toast.success(actionState.message || "Success!");
      // setTimeout(() => {
      router.push(ticketPath(ticket.id));
      // }, 1000);
    },
    onError() {
      toast.error(actionState.message || "Something went wrong");
    }
  }), [actionState.message, router, ticket.id])

  useActionFeedback(
    actionState.status as string,
    options
  )

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          defaultValue={actionState?.values?.title ?? ticket.title}
        />
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
        <Textarea
          placeholder="Type the ticket content here."
          id="content"
          name="content"
          defaultValue={actionState?.values?.content ?? ticket.content}
        />
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
          {/* <Label htmlFor="deadline">Dealine</Label> */}
          {/* <Input
            type="date"
            id="deadline"
            name="deadline"
            defaultValue={actionState?.values?.deadline ?? ticket.deadline}
          /> */}
          <DatePicker
            id="deadline"
            name="deadline"
            label="Deadline"
            defaultValue={actionState?.values?.deadline ?? ticket.deadline}
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
          <Input
            type="number"
            id="bounty"
            name="bounty"
            defaultValue={fromCent(ticket.bounty)}
          />
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

      <SubmitButton label="Update" pendingLabel="Updating" />
      {/* <p className="text-sm text-yellow-500">{actionState.message}</p> */}
    </form>
  )
}

export default TicketUpdateForm;
