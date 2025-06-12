'use client'

import { Ticket, TicketStatus } from "@prisma/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TrashIcon } from "lucide-react";
import { TICKET_STATUS_LABELS } from "../constants";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { toast } from "sonner";

interface TicketMoreMenuProps {
  ticket: Ticket;
  trigger: React.ReactNode;
}

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const ticketStatus = Object.keys(TICKET_STATUS_LABELS) as Array<keyof typeof TICKET_STATUS_LABELS>;
  const handleUpdateTicketStatus = async (value: string) => {
    const result = await updateTicketStatus(ticket.id, value as TicketStatus);
    console.log(result);
    if (result) {
      toast.success("Status updated")
    } else {
      toast.error("Error updating status")
    }
  }

  const deleteButton = (
    <DropdownMenuItem>
      <TrashIcon className="h-4 w-4" />
      Delete
    </DropdownMenuItem>
  )
  const ticketStatusRadioGroup = (
    <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleUpdateTicketStatus}>
      {ticketStatus.map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>{TICKET_STATUS_LABELS[key]}</DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-40">
        {ticketStatusRadioGroup}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TicketMoreMenu;
