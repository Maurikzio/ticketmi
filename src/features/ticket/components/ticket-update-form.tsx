"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@prisma/client";
import updateTicket from "../actions/update-ticket";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";

interface TicketUpdateFormProps {
  ticket: Ticket
}

const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {
  const [isPending, startTransition] = useTransition();

  const updateTicketAction = (formData: FormData) => {
    startTransition(async () => await updateTicket(ticket.id, formData))
  }

  return (
    <form action={updateTicketAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" placeholder="Title" defaultValue={ticket.title} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea placeholder="Type the ticket content here." id="content" name="content" defaultValue={ticket.content} />
      </div>

      <Button disabled={isPending}>
        {isPending ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin mr-4" />
            {"Updating"}
          </>
        ) : "Update"}
      </Button>
    </form>
  )
}

export default TicketUpdateForm;
