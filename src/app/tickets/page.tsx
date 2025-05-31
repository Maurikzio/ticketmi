import { initialTickets } from "@/data";
import Link from "next/link";
import { ticketPath } from "@/paths";
import { Pen, Check, File } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";

const TICKET_ICONS = {
  "OPEN": <File className="h-4 w-4" />,
  "IN_PROGRESS": <Pen className="h-4 w-4" />,
  "DONE": <Check className="h-4 w-4" />
}

export default async function Ticketspage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex-1 flex flex-col gap-y-8">
      <div className="">
        <h2 className="text-3xl font-bold tracking-tight">Tickets Page</h2>
        <p className="text-sm">All your tickets at one place</p>
      </div>
      <Separator />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
        {initialTickets.map(ticket => (
          <Card key={ticket.id} className="w-full max-w-[420px]">
            <CardHeader>
              <CardTitle className="flex gap-x-2 items-center">
                <div>{TICKET_ICONS[ticket.status]}</div>
                <h3 className="text-2xl">{ticket.title}</h3>
              </CardTitle>
              <CardDescription>Information of your ticket below.</CardDescription>
            </CardHeader>
            <CardContent>
              <span className={clsx("line-clamp-3", { "line-through": ticket.status === "DONE" })}>
                {ticket.content}
              </span>
            </CardContent>
            <CardFooter>
              <Link href={ticketPath(ticket.id)} className="text-sm underline">View</Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
