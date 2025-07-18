import { requireAuth } from "@/features/auth/utils/require-auth";
export default async function AuthenticatedLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {

  await requireAuth({ requireOrganization: true, requireActiveOrganization: true })

  return <>{children}</>
}
