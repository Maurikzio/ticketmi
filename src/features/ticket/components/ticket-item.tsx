import Link from "next/link";
import { ticketEditPath, ticketPath } from "@/paths";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import clsx from "clsx";
import { Pen, Check, File, ExternalLink, Pencil, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Profile, Ticket } from "@prisma/client";
import { formatCurrency } from "@/utils/currency";
import TicketMoreMenu from "./ticket-more-menu";

const TICKET_ICONS = {
  "OPEN": <File className="h-4 w-4" />,
  "IN_PROGRESS": <Pen className="h-4 w-4" />,
  "DONE": <Check className="h-4 w-4" />
}

interface TicketItemProps {
  ticket: Ticket & { profile: Profile }
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
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline} by {ticket.profile.userName} {ticket.profile.userLastname}</p>
          <p className="text-sm text-muted-foreground">{formatCurrency(ticket.bounty)}</p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {!isDetail ? (
          <Button variant="outline" asChild size="icon">
            <Link prefetch href={ticketPath(ticket.id)}>
              <ExternalLink />
            </Link>
          </Button>
        ) : null}
        {/* (
          <ConfirmDialog
            action={deleteTicket.bind(null, ticket.id)}
            trigger={
              <Button variant="outline" size="icon">
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        )} */}
        <Button variant="outline" size="icon" asChild>
          <Link prefetch href={ticketEditPath(ticket.id)}>
            <Pencil />
          </Link>
        </Button>
        <TicketMoreMenu
          ticket={ticket}
          trigger={
            <Button variant="outline" size="icon">
              <MoreVertical />
            </Button>
          }
        />
      </div>
    </div>
  )
};

export default TicketItem;
