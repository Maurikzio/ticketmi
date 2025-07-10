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

    await prisma.userOrganization.delete({
      where: {
        profileId_organizationId: {
          profileId,
          organizationId
        }
      }
    })

    return {
      message: 'Organization member deleted',
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
