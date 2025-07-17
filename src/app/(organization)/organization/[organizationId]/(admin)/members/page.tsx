import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import OrganizationMembersList from "@/features/organization/components/organization-members-list";
import { Suspense } from "react";
import OrganizationBreadcrumbs from "../_navigation/tabs";
import { InvitationCreateButton } from "@/features/organization/components/invitation-create-button";

interface OrganizationMembersPageProps {
  params: Promise<{ organizationId: string }>
}

export default async function OrganizationMembersPage({ params }: OrganizationMembersPageProps) {
  const { organizationId } = await params;
  return (
    <div className="flex-1 flex flex-col gap-8">
      <OrganizationBreadcrumbs />
      <Heading
        title="Organization Members"
        description="All your organization members"
        actions={<InvitationCreateButton organizationId={organizationId} />}
      />
      <Suspense fallback={<Spinner />}>
        <OrganizationMembersList organizationId={organizationId} />
      </Suspense>
    </div>
  )
}
