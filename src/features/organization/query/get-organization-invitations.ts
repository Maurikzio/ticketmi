import { prisma } from "@/lib/prisma"
import { getAdminOrRedirect } from "./get-admin-or-redirect"

export const getOrganizationInvitations = async (organizationId: string) => {
  await getAdminOrRedirect(organizationId)

  const organizationInvitations = prisma.invitation.findMany({
    where: {
      organizationId
    },
    select: {
      email: true,
      createdAt: true,
      invitedBy: {
        select: {
          userName: true,
          userLastname: true
        }
      }
    }
  })

  return organizationInvitations;
}
