import { requireAuth } from "@/features/auth/utils/require-auth"
import { prisma } from "@/lib/prisma"

export const getUserOrganization = async ({ profileId, organizationId }: { profileId: string, organizationId: string }) => {
  await requireAuth({ requireOrganization: true })

  const organizationMembers = await prisma.userOrganization.findUnique({
    where: {
      profileId_organizationId: {
        profileId,
        organizationId
      }
    }
  })

  return organizationMembers;
}
