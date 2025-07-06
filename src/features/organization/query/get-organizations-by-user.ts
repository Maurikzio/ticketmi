import { requireProfile } from "@/features/auth/utils/requireProfile"
import { prisma } from "@/lib/prisma"

export const getOrganizationsByUser = async () => {
  const userData = await requireProfile()

  const userOrganizations = await prisma.userOrganization.findMany({
    where: {
      userId: userData?.user.id
    },
    include: {
      organization: true
    }
  })

  return userOrganizations;
}
