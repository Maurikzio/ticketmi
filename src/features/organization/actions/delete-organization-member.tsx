"use server"

import { requireAuth } from "@/features/auth/utils/require-auth"
import { prisma } from "@/lib/prisma"
import { accountProfilePath } from "@/paths"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"
import { getOrganizationMembers } from "../query/get-organization-members"

export async function deleteOrganizationMember({ profileId, organizationId }: { profileId: string, organizationId: string }) {
  try {
    const context = await requireAuth({ requireOrganization: true })

    if (!context.profile) {
      redirect(accountProfilePath)
    }

    const orgMembers = await getOrganizationMembers(organizationId);
    const isLastMember = (orgMembers?.members || []).length <= 1;
    if (isLastMember) {
      return {
        status: "error",
        message: "You can not delete the last member of the organization"
      }
    }

    //check if uo/member exists
    const targetMember = (orgMembers?.members || []).find(member => member.profileId === profileId)

    if (!targetMember) {
      return {
        status: "error",
        message: "Member not found"
      }
    }

    //check if user is deleting last admin
    const adminMembers = (orgMembers?.members ?? []).filter(
      (member) => member.role === "ADMIN"
    );

    const removesAdmin = targetMember.role === "ADMIN";
    const isLastAdmin = adminMembers.length <= 1;

    if (removesAdmin && isLastAdmin) {
      return {
        status: "error",
        message: "You cannot delete the last admin of an organization"
      }
    }

    // check is who deletes is the admin
    const myMembership = (orgMembers?.members || []).find(member => member.profileId === context.profile.id);
    const isMyself = context.profile.id === profileId;
    const isAdmin = myMembership?.role === "ADMIN";

    if (!isMyself && !isAdmin) {
      return {
        message: 'You can only delete member as an admin',
        status: "error"
      }
    }

    await prisma.userOrganization.delete({
      where: {
        profileId_organizationId: {
          profileId,
          organizationId
        }
      }
    })

    return {
      message: isMyself ? 'You have left the organization' : 'Organization member deleted',
      status: "success"
    }
  } catch (error) {
    const message = error instanceof Prisma.PrismaClientValidationError
      ? "Something went wrong"
      : error instanceof Error ? error.message : "Something went wrong"
    return {
      status: "error",
      message,
    }
  }
}
