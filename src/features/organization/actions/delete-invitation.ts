"use server"

// import { requireAuth } from "@/features/auth/utils/require-auth";
import { prisma } from "@/lib/prisma";
import { invitationsPath, signInPath } from "@/paths";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminOrRedirect } from "../query/get-admin-or-redirect";

type DeleteInvitationArgs = {
  email: string;
  organizationId: string;
}

export async function deleteInvitation({ email, organizationId }: DeleteInvitationArgs) {

  try {
    const context = await getAdminOrRedirect(organizationId)

    if (!context.profile) {
      redirect(signInPath)
    }

    const invitation = await prisma.invitation.findUnique({
      where: {
        organizationId_email: {
          organizationId,
          email
        }
      }
    })

    if (!invitation) {
      return {
        status: "error",
        message: "Invitation not found"
      }
    }

    await prisma.invitation.delete({
      where: {
        organizationId_email: {
          organizationId,
          email
        }
      }
    })

    revalidatePath(invitationsPath(invitation.organizationId)) // we also can revalidate from the client using router.refresh() in onSuccessAction
    return {
      message: 'Invitation deleted',
      status: "success"
    }
  } catch (error) {
    console.log(error)
    const message = error instanceof Prisma.PrismaClientValidationError
      ? "Something went wrong"
      : error instanceof Error ? error.message : "Something went wrong"
    return {
      status: "error",
      message,
    }
  }
}
