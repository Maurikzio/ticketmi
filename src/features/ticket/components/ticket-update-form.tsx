"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@prisma/client";
import updateTicket from "../actions/update-ticket";
import SubmitButton from "@/components/form/submit-button";
import { useActionState } from "react";

interface TicketUpdateFormProps {
  ticket: Ticket
}

const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {
  const initialState: { message?: string } = { message: "" }
  const updateTicketWithId = updateTicket.bind(null, ticket.id);
  const [actionState, action] = useActionState(
    updateTicketWithId,
    initialState
  )

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" placeholder="Title" defaultValue={ticket.title} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea placeholder="Type the ticket content here." id="content" name="content" defaultValue={ticket.content} />
      </div>

      <SubmitButton label="Update" pendingLabel="Updating" />
      {actionState.message}
    </form>
  )
}

export default TicketUpdateForm;
