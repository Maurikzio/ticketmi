import { requireProfile } from "@/features/auth/utils/requireProfile"
import { prisma } from "@/lib/prisma";

export const getActiveOrganization = async () => {
  const profileData = await requireProfile();

  if (!profileData?.profile) {
    return null;
  }

  const activeOrganization = await prisma.organization.findFirst({
    where: {
      members: {
        some: {
          profileId: profileData.profile.id,
          isActive: true
        }
      }
    }
  })

  return activeOrganization
}
