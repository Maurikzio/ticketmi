'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import createTicket from "../actions/create-ticket";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";

const TicketCreateForm = () => {
  const [isPending, startTransition] = useTransition();

  const createTicketAction = (formData: FormData) => {
    startTransition(async () => await createTicket(formData))
  }

  return (
    <form action={createTicketAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" placeholder="Title" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea placeholder="Type the ticket content here." id="content" name="content" />
      </div>

      <Button disabled={isPending}>
        {isPending ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin mr-4" />
            {"Creating"}
          </>
        ) : "Create"}
      </Button>
    </form>
  )
}

export default TicketCreateForm;
