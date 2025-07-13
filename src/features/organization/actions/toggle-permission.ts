"use server"

import { prisma } from "@/lib/prisma";
import { getAdminOrRedirect } from "../query/get-admin-or-redirect";
import { revalidatePath } from "next/cache";
import { organizationMembersPath } from "@/paths";

type PermissionKey = "canDeleteTicket";

interface TogglePermissionArgs {
  profileId: string;
  organizationId: string;
  permissionKey: PermissionKey
}
export const togglePermission = async ({ profileId, organizationId, permissionKey }: TogglePermissionArgs) => {
  await getAdminOrRedirect(organizationId)

  // user organization
  const membership = await prisma.userOrganization.findUnique({
    where: {
      profileId_organizationId: {
        profileId,
        organizationId
      }
    },
  })

  if (!membership) {
    return {
      message: "Member not found",
      status: "error"
    }
  }

  await prisma.userOrganization.update({
    where: {
      profileId_organizationId: {
        profileId,
        organizationId
      }
    },
    data: {
      [permissionKey]: membership[permissionKey] === true ? false : true
    }
  })

  revalidatePath(organizationMembersPath(organizationId))

  return {
    message: "Permission updated",
    status: "success"
  }
}
