import Link from "next/link";
import { ticketPath } from "@/paths";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import clsx from "clsx";
import { Pen, Check, File, SquarePen } from "lucide-react";
import { Ticket } from "../definitions";
import { Button } from "@/components/ui/button";

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
    <div className="w-full max-w-[420px] flex gap-x-1">
      <Card className="w-full ">
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
      </Card>
      <div className="flex flex-col gap-y-1">
        <Button variant="outline" asChild size="icon">
          <Link href={ticketPath(ticket.id)}>
            <SquarePen />
          </Link>
        </Button>
      </div>
    </div>
  )
};

export default TicketItem;
