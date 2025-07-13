import CardCompact from "@/components/card-compact";
import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import TicketCreateForm from "@/features/ticket/components/ticket-create-form";
import TicketList from "@/features/ticket/components/ticket-list";
import { ParsedSearchParams, searchParamsCache } from "@/features/ticket/definitions";
import { Suspense } from "react";

interface TicketsByOrganizationPageProps {
  searchParams: ParsedSearchParams
}

export default async function TicketsByOrganizationPage({ searchParams }: TicketsByOrganizationPageProps) {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex-1 flex flex-col gap-y-8">
      <Heading title="Our Tickets" description="All your tickets at one place" />

      <CardCompact
        className="w-full max-w-[420px] self-center"
        title="Create Ticket"
        description="A new ticket will be created here"
        content={<TicketCreateForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList searchParams={searchParamsCache.parse(searchParams)} byOrganization={true} />
      </Suspense>
    </div>
  );
}
