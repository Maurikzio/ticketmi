import { getAdminOrRedirect } from "@/features/organization/query/get-admin-or-redirect";

interface OrganizationAdminLayoutProps {
  children: Readonly<{ children: React.ReactNode; }>
  params: Promise<{ organizationId: string }>
}

export default async function OrganizationAdminLayout({ children, params }: OrganizationAdminLayoutProps) {
  const { organizationId } = await params;

  await getAdminOrRedirect(organizationId)

  return <>{children}</>
}
