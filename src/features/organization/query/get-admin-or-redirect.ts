import { requireAuth } from "@/features/auth/utils/require-auth"
import { getUserOrganization } from "./get-user-organization";
import { signInPath } from "@/paths";
import { redirect } from "next/navigation";

export const getAdminOrRedirect = async (organizationId: string) => {
  const authData = await requireAuth();

  if (!authData?.profile?.id) {
    redirect(signInPath)
  }

  const membership = await getUserOrganization({ organizationId, profileId: authData.profile?.id })

  if (!membership) {
    redirect(signInPath)
  }

  if (membership.role !== "ADMIN") {
    redirect(signInPath)
  }

  return { ...authData, membership }
}
