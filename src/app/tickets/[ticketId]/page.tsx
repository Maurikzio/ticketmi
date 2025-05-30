import { initialTickets } from "@/data";

type TicketPageProps = {
  params: {
    ticketId: string;
  }
}

export default async function Ticketpage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = initialTickets.find((t) => t.id === ticketId);

  if (!ticket) {
    return (
      <p>Ticket not found</p>
    )
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h2>Ticket Page {ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
    </div>
  );
}
