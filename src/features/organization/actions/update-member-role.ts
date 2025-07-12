"use server"

import { ROLE } from "@prisma/client";
import { getAdminOrRedirect } from "../query/get-admin-or-redirect";
import { getOrganizationMembers } from "../query/get-organization-members";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { organizationMembersPath } from "@/paths";

type UpdateMemberRoleArgs = {
  profileId: string;
  organizationId: string;
  memberRole: ROLE
}

export default async function updateMemberRole({ profileId, organizationId, memberRole }: UpdateMemberRoleArgs) {
  //only admions perform operations
  await getAdminOrRedirect(organizationId)
  const orgMembers = await getOrganizationMembers(organizationId)

  //check if member exists
  const targetMember = (orgMembers?.members ?? []).find(member => member.profileId === profileId)

  if (!targetMember) {
    return {
      status: "error" as const,
      message: "Member not found"
    }
  }

  //check if last admin
  const adminMembers = (orgMembers?.members ?? []).filter(member => member.role === "ADMIN")

  const removesAdmin = targetMember.role === "ADMIN"
  const isLastAdmin = adminMembers.length <= 1;

  if (removesAdmin && isLastAdmin) {
    return {
      status: "error" as const,
      message: "Ladt admin cannot be removed from organization"
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
      role: memberRole
    }
  })

  revalidatePath(organizationMembersPath(organizationId))

  return {
    state: "success",
    message: "The role has been updated"
  }
}
