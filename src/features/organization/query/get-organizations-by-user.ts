import { requireProfile } from "@/features/auth/utils/requireProfile"
import { prisma } from "@/lib/prisma"

export const getOrganizationsByUser = async () => {
  const userData = await requireProfile()

  // const userOrganizations = await prisma.userOrganization.findMany({
  //   where: {
  //     userId: userData?.user.id
  //   },
  //   include: {
  //     organization: true
  //   }
  // })

  const userOrganizations = await prisma.organization.findMany({
    where: {
      members: {
        some: {
          profileId: userData?.profile.id
        }
      }
    },
    include: {
      members: {
        where: {
          profileId: userData?.profile.id
        }
      },
      _count: {
        select: {
          members: true
        }
      }
    }
  })

  return userOrganizations.map(({ members, ...organization }) => ({ ...organization, member: members[0] }))
}
