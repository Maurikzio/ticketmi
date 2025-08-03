import { getAdminOrRedirect } from "@/features/organization/query/get-admin-or-redirect"
import { prisma } from "@/lib/prisma";

export const getCredentials = async (organizationId: string) => {
  await getAdminOrRedirect(organizationId);

  return await prisma.credential.findMany({
    where: {
      organizationId
    },
    select: {
      id: true,
      createdAt: true,
      name: true,
      lastUsed: true
    }
  })
}
