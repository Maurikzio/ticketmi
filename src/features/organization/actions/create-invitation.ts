"use server"

import { z } from "zod"
import { getAdminOrRedirect } from "../query/get-admin-or-redirect"
import { Prisma } from "@prisma/client"
import { InvitationFormState } from "../definitions"
import { revalidatePath } from "next/cache"
import { invitationsPath } from "@/paths"
import { prisma } from "@/lib/prisma"
import { profile } from "console"

const createInvitationSchema = z.object({
  email: z.string().min(1, { message: "Is required" }).max(191).email()
})

export const createInvitation = async (organizationId: string, _actionState: InvitationFormState, formData: FormData): Promise<InvitationFormState> => {
  const context = await getAdminOrRedirect(organizationId)

  const validatedFields = createInvitationSchema.safeParse({
    email: formData.get("email")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { email } = validatedFields.data;

  //check if email does not belongs to an existing member in organization
  const targetMember = await prisma.userOrganization.findFirst({
    where: {
      organizationId,
      profile: {
        email
      }
    }
  })

  if (targetMember) {
    return {
      status: "error" as const,
      message: "User already is a member of organization"
    }
  }

  try {

    const emailInvitationLink = await generateInvitationLink(context.profile.id, organizationId, email)
    console.log(emailInvitationLink)

    revalidatePath(invitationsPath(organizationId))
    return { status: "success" as const, message: "Invitation successfully sent" }
  } catch (error) {
    const message = error instanceof Prisma.PrismaClientValidationError
      ? "Something went wrong"
      : error instanceof Error ? error.message : "Something went wrong"
    return {
      status: "error" as const,
      message,
    }
  }

}
