"use server"

// import { requireAuth } from "@/features/auth/utils/require-auth";
import { prisma } from "@/lib/prisma";
import { organizationsPath, signInPath } from "@/paths";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminOrRedirect } from "../query/get-admin-or-redirect";

export async function deleteOrganization(organizationId: string) {

  try {
    const context = await getAdminOrRedirect(organizationId)

    if (!context.profile) {
      redirect(signInPath)
    }

    const canDelete = context.profile.organizations.some(uo => uo.organizationId === organizationId)

    if (!canDelete) {
      return {
        message: "Not allowed",
        status: "error"
      }
    }

    await prisma.organization.delete({
      where: {
        id: organizationId
      }
    })

    revalidatePath(organizationsPath) // we also can revalidate from the client using router.refresh() in onSuccessAction
    return {
      message: 'Organization deleted',
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
