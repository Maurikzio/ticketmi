import Heading from "@/components/heading";
import { Suspense } from "react";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
import { ParsedSearchParams, searchParamsCache } from "@/features/ticket/definitions";

interface HomepageProps {
  searchParams: ParsedSearchParams
}

export default async function Homepage({ searchParams }: HomepageProps) {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex-1 flex flex-col gap-y-8">
      <Heading title="Home" description="Your home place to start" />
      <Suspense fallback={<Spinner />}>
        <TicketList searchParams={searchParamsCache.parse(searchParams)} />
      </Suspense>
    </div>
  );
}
