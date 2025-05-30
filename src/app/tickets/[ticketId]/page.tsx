type TicketPageProps = {
  params: {
    ticketId: string;
  }
}

export default async function Ticketpage({ params }: TicketPageProps) {
  const { ticketId } = await params;

  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <h2>Ticket Page {ticketId}</h2>
    </div>
  );
}
