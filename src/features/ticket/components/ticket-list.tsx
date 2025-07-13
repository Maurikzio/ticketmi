import Placeholder from "@/components/placeholder";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import TicketSearchInput from "./ticket-search-input";
import TicketSortSelect from "./ticket-sort-select";
import TicketPagination from "./ticket-pagination";
import { ParsedSearchParams } from "../definitions";

interface TicketListProps {
  searchParams: ParsedSearchParams
  byOrganization?: boolean
}
const TicketList = async ({ searchParams, byOrganization }: TicketListProps) => {
  const { list: tickets, metadata: ticketMetadata } = await getTickets(searchParams, byOrganization);

  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Bounty", value: "bounty" },
  ]

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-[420px] flex gap-2">
        <TicketSearchInput placeholder="Search ticket" />
        <TicketSortSelect options={sortOptions} />
      </div>
      {tickets?.length ? tickets.map(ticket => (
        <TicketItem key={ticket.id} ticket={ticket} />
      )) : (
        <Placeholder label="No tickets found" />
      )}
      <div className="w-full max-w-[420px]">
        <TicketPagination paginatedTicketMetadata={ticketMetadata} />
      </div>
    </div>
  )
};

export default TicketList;
