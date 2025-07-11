import { requireAuth } from "@/features/auth/utils/require-auth"
import { prisma } from "@/lib/prisma"

export const getOrganizationMembers = async (organizationId: string) => {
  await requireAuth({ requireOrganization: true })

  const organizationMembers = await prisma.organization.findUnique({
    where: {
      id: organizationId
    },
    include: {
      members: {
        include: {
          profile: true
        }
      }
    }
  })

  return organizationMembers;
}
