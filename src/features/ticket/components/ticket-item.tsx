import Link from "next/link";
import { ticketPath } from "@/paths";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import clsx from "clsx";
import { Pen, Check, File } from "lucide-react";
import { Ticket } from "../definitions";

const TICKET_ICONS = {
  "OPEN": <File className="h-4 w-4" />,
  "IN_PROGRESS": <Pen className="h-4 w-4" />,
  "DONE": <Check className="h-4 w-4" />
}

interface TicketItemProps {
  ticket: Ticket
}

const TicketItem = ({ ticket }: TicketItemProps) => {
  return (
    <Card className="w-full max-w-[420px]">
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
  )
};

export default TicketItem;
