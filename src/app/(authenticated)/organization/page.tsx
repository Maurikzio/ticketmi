import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import OrganizationList from "@/features/organization/components/organization-list";
import { Suspense } from "react";

export default function OrganizationPage() {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <Heading title="Organizations" description="All your organizations" />

      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  )
}
