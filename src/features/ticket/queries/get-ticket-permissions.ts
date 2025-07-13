import { prisma } from "@/lib/prisma";

type GetTicketPermissions = {
  organizationId: string | undefined;
  profileId: string | undefined;
};

export const getTicketPermissions = async ({
  organizationId,
  profileId,
}: GetTicketPermissions) => {
  if (!organizationId || !profileId) {
    return {
      canDeleteTicket: false,
    };
  }

  const membership = await prisma.userOrganization.findUnique({
    where: {
      profileId_organizationId: {
        profileId,
        organizationId,
      },
    },
  });

  if (!membership) {
    return {
      canDeleteTicket: false,
    };
  }

  return {
    canDeleteTicket: membership.canDeleteTicket,
  };
};
