import { initialTickets } from "@/data";
import Link from "next/link";
import { ticketPath } from "@/paths";

export default async function Ticketspage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <h2>Tickets Page</h2>
      <div>
        {initialTickets.map(ticket => (
          <div key={ticket.id}>
            <h2>{ticket.title}</h2>
            <Link href={ticketPath(ticket.id)} className="text-sm underline">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
