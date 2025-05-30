import { initialTickets } from "@/data";
import Link from "next/link";

export default async function Ticketspage() {
  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <h2>Tickets Page</h2>
      <div>
        {initialTickets.map(ticket => (
          <div key={ticket.id}>
            <h2>{ticket.title}</h2>
            <Link href={`/tickets/${ticket.id}`} className="text-sm underline">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
