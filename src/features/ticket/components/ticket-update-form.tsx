"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@prisma/client";
import updateTicket from "../actions/update-ticket";
import SubmitButton from "@/components/form/submit-button";
import { useActionState } from "react";
import { FormState } from "../definitions";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    if (actionState?.status === "success") {
      toast.success(actionState.message || "Success!");
      setTimeout(() => {
        router.push("/tickets");
      }, 1000);
    } else if (actionState?.status === "error") {
      toast.error(actionState.message || "Something went wrong");
    }
  }, [actionState, router])

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

      <SubmitButton label="Update" pendingLabel="Updating" />
      {/* <p className="text-sm text-yellow-500">{actionState.message}</p> */}
    </form>
  )
}

export default TicketUpdateForm;
