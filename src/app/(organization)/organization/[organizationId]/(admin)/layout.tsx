import { getAdminOrRedirect } from "@/features/organization/query/get-admin-or-redirect";

export default async function OrganizationAdminLayout(
  { children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ organizationId: string }> }>
) {
  const { organizationId } = await params;

  await getAdminOrRedirect(organizationId)

  return <>{children}</>
}
