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
import { deleteTicket } from "../actions/delete-ticket";
import useConfirmDialog from "@/components/use-confirm-dialog";

interface TicketMoreMenuProps {
  ticket: Ticket;
  trigger: React.ReactNode;
}

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  // 3
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <TrashIcon className="h-4 w-4" />
        Delete
      </DropdownMenuItem>
    )
  });

  const ticketStatus = Object.keys(TICKET_STATUS_LABELS) as Array<keyof typeof TICKET_STATUS_LABELS>;
  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus);
    toast.promise(promise, { loading: 'Updating status...' })
    const result = await promise;
    if (result) {
      toast.success("Status updated")
    } else {
      toast.error("Error updating status")
    }
  }

  //2
  // const deleteButton = (
  //   <ConfirmDialog
  //     action={deleteTicket.bind(null, ticket.id)}
  //     trigger={
  //       <DropdownMenuItem>
  //         <TrashIcon className="h-4 w-4" />
  //         Delete
  //       </DropdownMenuItem>
  //     }
  //   />
  // );

  //1
  // const deleteButton = (
  //   <DropdownMenuItem>
  //     <TrashIcon className="h-4 w-4" />
  //     Delete
  //   </DropdownMenuItem>
  // )
  const ticketStatusRadioGroup = (
    <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleUpdateTicketStatus}>
      {ticketStatus.map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>{TICKET_STATUS_LABELS[key]}</DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  )

  return (
    <>
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
      {deleteDialog}
    </>
  )
}

export default TicketMoreMenu;
