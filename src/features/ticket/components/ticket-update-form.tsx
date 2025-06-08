"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@prisma/client";
import updateTicket from "../actions/update-ticket";
import SubmitButton from "@/components/form/submit-button";
import { useActionState } from "react";
import { FormState } from "../definitions";

interface TicketUpdateFormProps {
  ticket: Ticket
}

const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {
  const initialState: FormState = { message: "", errors: {} }
  const updateTicketWithId = updateTicket.bind(null, ticket.id);
  const [actionState, action] = useActionState(
    updateTicketWithId,
    initialState
  )

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        {/* TODO: replace defaultValue since when error, we will see again the prev value of the input */}
        <Input type="text" id="title" name="title" placeholder="Title" defaultValue={ticket.title} />
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
        <Textarea placeholder="Type the ticket content here." id="content" name="content" defaultValue={ticket.content} />
        {actionState.errors?.content ? (
          actionState.errors.content.map(error => (
            <p
              key={error}
              className='mt-2 text-sm text-red-500'
            >{error}</p>
          ))
        ) : null}
      </div>

      <SubmitButton label="Update" pendingLabel="Updating" />
      <p className="text-sm text-yellow-500">{actionState.message}</p>
    </form>
  )
}

export default TicketUpdateForm;
