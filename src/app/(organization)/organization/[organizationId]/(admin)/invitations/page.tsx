import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import { Suspense } from "react";
import OrganizationBreadcrumbs from "../_navigation/tabs";
import InvitationList from "@/features/organization/components/invitations-list";

interface OrganizationInvitationsPageProps {
  params: Promise<{ organizationId: string }>
}

export default async function OrganizationInvitationsPage({ params }: OrganizationInvitationsPageProps) {
  const { organizationId } = await params;
  return (
    <div className="flex-1 flex flex-col gap-8">
      <OrganizationBreadcrumbs />
      <Heading
        title="Organization Invitations"
        description="All your organization invitations"
      />
      <Suspense fallback={<Spinner />}>
        <InvitationList organizationId={organizationId} />
      </Suspense>
    </div>
  )
}
