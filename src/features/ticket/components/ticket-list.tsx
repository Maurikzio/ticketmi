import Placeholder from "@/components/placeholder";
import SearchInput from "@/components/search-input";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";

interface TicketListProps {
  profileId?: string;
  search?: string;
}
const TicketList = async ({ profileId, search }: TicketListProps) => {
  const tickets = await getTickets(profileId, search);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-[420px]">
        <SearchInput placeholder="Search ticket" />
      </div>
      {tickets.length ? tickets.map(ticket => (
        <TicketItem key={ticket.id} ticket={ticket} />
      )) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  )
};

export default TicketList;
