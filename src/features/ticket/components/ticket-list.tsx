import TicketItem from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";

interface TicketListProps {
  profileId?: string;
}
const TicketList = async ({ profileId }: TicketListProps) => {
  const tickets = await getTickets(profileId);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      {tickets.map(ticket => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  )
};

export default TicketList;
