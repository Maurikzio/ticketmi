import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@prisma/client";
import updateTicket from "../actions/update-ticket";

interface TicketUpdateFormProps {
  ticket: Ticket
}

const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {

  return (
    <form action={updateTicket.bind(null, ticket.id)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" placeholder="Title" defaultValue={ticket.title} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea placeholder="Type the ticket content here." id="content" name="content" defaultValue={ticket.content} />
      </div>

      <Button>Update</Button>
    </form>
  )
}

export default TicketUpdateForm;
