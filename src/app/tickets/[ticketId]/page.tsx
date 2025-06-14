
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
}

export default async function Ticketpage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound()
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail={true} />
    </div>
  );
}
