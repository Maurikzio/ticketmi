import { requireProfile } from "@/features/auth/utils/requireProfile"
import { prisma } from "@/lib/prisma";

export const getActiveUserOrganization = async () => {
  const profileData = await requireProfile();

  if (!profileData?.profile) {
    return null;
  }

  const activeUserOrganization = await prisma.userOrganization.findFirst({
    where: {
      profileId: profileData.profile.id,
      isActive: true
    }
  })

  return activeUserOrganization;
}
