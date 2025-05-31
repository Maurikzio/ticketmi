import { initialTickets } from "@/data";
import Link from "next/link";
import { ticketPath } from "@/paths";
import clsx from "clsx";

export default async function Ticketspage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex-1 flex flex-col gap-y-8">
      <div className="">
        <h2 className="text-3xl font-bold tracking-tight">Tickets Page</h2>
        <p className="text-sm">All your tickets at one place</p>
      </div>
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
        {initialTickets.map(ticket => (
          <div key={ticket.id} className="w-full max-w-[420px] p-4 border border-slate-100 rounded">
            <h3 className="text-lg font-semibold truncate">{ticket.title}</h3>
            <p className={clsx("text-sm text-slate-500 truncate", {
              "line-through": ticket.status === "DONE"
            })}>{ticket.content}</p>
            <Link href={ticketPath(ticket.id)} className="text-sm underline">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
