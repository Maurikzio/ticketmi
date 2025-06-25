import CardCompact from "@/components/card-compact";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import TicketUpdateForm from "@/features/ticket/components/ticket-update-form";
import { notFound } from "next/navigation";
import { requireProfile } from "@/features/auth/utils/requireProfile";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Ticket } from "@prisma/client";
import Breadcrumbs from "@/components/breadrumbs";
import { Separator } from "@/components/ui/separator";
import { ticketPath } from "@/paths";

interface TicketEditPageProps {
  params: Promise<{ ticketId: string }>
}

export default async function TicketEditPage({ params }: TicketEditPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);
  const profileData = await requireProfile()
  const isTicketOwner = isOwner(profileData?.profile, ticket as Ticket);

  if (!ticket || !isTicketOwner) {
    notFound()
  }

  const breadcrumbs = [
    { title: "Tickets", href: "/tickets" },
    { title: ticket.title, href: ticketPath(ticket.id) },
    { title: "Edit" }
  ]


  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Separator />
      <div className="flex-1 flex flex-col justify-center items-center">

        <CardCompact
          className="w-full max-w-[420px] animate-fade-in-from-top"
          title="Edit Ticket"
          description="Edit an existing ticket"
          content={<TicketUpdateForm ticket={ticket} />}
        />
      </div>
    </div>
  )
}
