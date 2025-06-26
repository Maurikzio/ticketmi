import Placeholder from "@/components/placeholder";
import SearchInput from "@/components/search-input";
import SortSelector from "@/components/sort-selector";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";

interface TicketListProps {
  profileId?: string;
  search?: string;
  sort?: string;
}
const TicketList = async ({ profileId, search, sort }: TicketListProps) => {
  const tickets = await getTickets(profileId, search, sort);

  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Bounty", value: "bounty" },
  ]

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-[420px] flex gap-2">
        <SearchInput placeholder="Search ticket" />
        <SortSelector
          defaultValue="newest"
          options={sortOptions}
          sort={sort}
        />
      </div>
      {tickets?.length ? tickets.map(ticket => (
        <TicketItem key={ticket.id} ticket={ticket} />
      )) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  )
};

export default TicketList;
