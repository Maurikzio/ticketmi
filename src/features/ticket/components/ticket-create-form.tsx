'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import createTicket from "../actions/create-ticket";
import SubmitButton from "@/components/form/submit-button";
import { useActionState } from "react";

const TicketCreateForm = () => {
  const initialState: { message?: string } = { message: '' };
  const [actionState, action] = useActionState(createTicket, initialState);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" placeholder="Title" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea placeholder="Type the ticket content here." id="content" name="content" />
      </div>

      <SubmitButton label="Create" pendingLabel="Creating" />
      {actionState.message}
    </form>
  )
}

export default TicketCreateForm;
