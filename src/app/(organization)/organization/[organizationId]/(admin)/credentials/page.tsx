import Heading from "@/components/heading";
import OrganizationBreadcrumbs from "../_navigation/tabs";

interface CredentialsPageProps {
  params: Promise<{ organizationId: string }>
}

export default async function CredentialsPage({ params }: CredentialsPageProps) {
  return (
    <div className="flex-1 flex flex-col gap-8">
      <OrganizationBreadcrumbs />
      <Heading
        title="Credentials"
        description="Manage your organization's API secrets"
      />
    </div>
  )
}
