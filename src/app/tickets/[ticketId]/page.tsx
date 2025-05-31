import { initialTickets } from "@/data";
import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ticketsPath } from "@/paths";

type TicketPageProps = {
  params: {
    ticketId: string;
  }
}

export default async function Ticketpage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = initialTickets.find((t) => t.id === ticketId);

  if (!ticket) {
    return <Placeholder
      label="Ticket not found"
      button={
        <Button asChild variant="outline">
          <Link href={ticketsPath}>Go to</Link>
        </Button>
      }
    />
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h2>Ticket Page {ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  );
}
