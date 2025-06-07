import Link from "next/link";
import { ticketEditPath, ticketPath } from "@/paths";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import clsx from "clsx";
import { Pen, Check, File, TrashIcon, ExternalLink, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ticket } from "@prisma/client";
import { deleteTicket } from "../actions/delete-ticket";

const TICKET_ICONS = {
  "OPEN": <File className="h-4 w-4" />,
  "IN_PROGRESS": <Pen className="h-4 w-4" />,
  "DONE": <Check className="h-4 w-4" />
}

interface TicketItemProps {
  ticket: Ticket;
  isDetail?: boolean;
}

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  return (
    <div className={clsx("w-full flex gap-x-1", { "max-w-[420px]": !isDetail, "max-w-[580px]": isDetail })}>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <div>{TICKET_ICONS[ticket.status]}</div>
            <h3 className="text-2xl">{ticket.title}</h3>
          </CardTitle>
          <CardDescription>Information of your ticket below.</CardDescription>
        </CardHeader>
        <CardContent>
          <span className={clsx({ "line-through": ticket.status === "DONE", "line-clamp-3": !isDetail })}>
            {ticket.content}
          </span>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-y-1">
        {!isDetail ? (
          <Button variant="outline" asChild size="icon">
            <Link prefetch href={ticketPath(ticket.id)}>
              <ExternalLink />
            </Link>
          </Button>
        ) : (
          <form action={deleteTicket.bind(null, ticket.id)}>
            <Button variant="outline" size="icon">
              <TrashIcon className="h-4 w-4" />
            </Button>
          </form>
        )}
        <Button variant="outline" size="icon" asChild>
          <Link prefetch href={ticketEditPath(ticket.id)}>
            <Pencil />
          </Link>
        </Button>
      </div>
    </div>
  )
};

export default TicketItem;
