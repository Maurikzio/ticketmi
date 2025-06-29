
import Breadcrumbs from "@/components/breadrumbs";
import { Separator } from "@/components/ui/separator";
import { getComments } from "@/features/comment/queries/get-comments";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
}

export default async function Ticketpage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);
  const [ticket, comments] = await Promise.all([ticketPromise, commentsPromise])

  if (!ticket) {
    notFound()
  }

  const breadcrumbs = [{ title: "Tickets", href: "/tickets" }, { title: ticket.title }]

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Separator />
      <div className="font-[family-name:var(--font-geist-sans)] flex justify-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail={true} comments={comments} />
      </div>
    </div>
  );
}
