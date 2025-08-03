import Heading from "@/components/heading";
import OrganizationBreadcrumbs from "../_navigation/tabs";
import { CredentialCreateButton } from "@/features/crendential/components/credential-create-button";
import { Suspense } from "react";
import Spinner from "@/components/spinner";
import CredentialList from "@/features/crendential/components/credential-list";

interface CredentialsPageProps {
  params: Promise<{ organizationId: string }>
}

export default async function CredentialsPage({ params }: CredentialsPageProps) {
  const { organizationId } = await params;
  return (
    <div className="flex-1 flex flex-col gap-8">
      <OrganizationBreadcrumbs />
      <Heading
        title="Credentials"
        description="Manage your organization's API secrets"
        actions={<CredentialCreateButton organizationId={organizationId} />}
      />
      <Suspense fallback={<Spinner />}>
        <CredentialList organizationId={organizationId} />
      </Suspense>
    </div>
  )
}
