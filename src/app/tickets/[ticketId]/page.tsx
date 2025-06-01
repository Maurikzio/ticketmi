import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ticketsPath } from "@/paths";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/queries/get-ticket";

type TicketPageProps = {
  params: {
    ticketId: string;
  }
}

export default async function Ticketpage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

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
    <div className="font-[family-name:var(--font-geist-sans)] flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail={true} />
    </div>
  );
}
