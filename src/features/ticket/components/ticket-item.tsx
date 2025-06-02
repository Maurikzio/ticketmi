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
import { Button } from "@/components/ui/button";
import { Ticket } from "@prisma/client";

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
      {!isDetail ? (
        <div className="flex flex-col gap-y-1">
          <Button variant="outline" asChild size="icon">
            <Link href={ticketPath(ticket.id)}>
              <SquarePen />
            </Link>
          </Button>
        </div>
      ) : null}
    </div>
  )
};

export default TicketItem;
