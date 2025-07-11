import { requireAuth } from "@/features/auth/utils/require-auth";

export default async function OrganizationLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {

  await requireAuth({ requireOrganization: true })

  return <>{children}</>
}
