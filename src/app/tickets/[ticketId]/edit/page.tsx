import CardCompact from "@/components/card-compact";
import { getTicket } from "@/features/queries/get-ticket";
import TicketUpdateForm from "@/features/ticket/components/ticket-update-form";
import { notFound } from "next/navigation";

interface TicketEditPageProps {
  params: {
    ticketId: string
  }
}

export default async function TicketEditPage({ params }: TicketEditPageProps) {
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
    notFound()
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        className="w-full max-w-[420px] animate-fade-in-from-top"
        title="Edit Ticket"
        description="Edit an existing ticket"
        content={<TicketUpdateForm ticket={ticket} />}
      />
    </div>
  )
}
