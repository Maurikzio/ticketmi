"use server"

import { prisma } from "@/lib/prisma"
import { OrganizationFormState } from "../definitions"
import { z } from "zod"
import { requireProfile } from "@/features/auth/utils/requireProfile"
import { redirect } from "next/navigation"
import { signInPath } from "@/paths"
import { Prisma } from "@prisma/client"

const createOrganizationSchema = z.object({
  name: z.string().min(1).max(191)
})

export const createOrganization = async (_actionState: OrganizationFormState, formData: FormData): Promise<OrganizationFormState> => {
  const userData = await requireProfile();

  if (!userData?.user) {
    redirect(signInPath)
  }

  const validatedFields = createOrganizationSchema.safeParse({
    name: formData.get("name")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { name } = validatedFields.data;

  try {
    const organization = await prisma.organization.create({
      data: {
        name,
        members: {
          create: {
            profileId: userData.profile.id,
            role: "ADMIN"
          }
        }
      },
    })

    await prisma.userOrganization.updateMany({
      where: {
        profileId: userData.profile.id,
        organizationId: {
          not: organization.id
        }
      },
      data: {
        isActive: false
      }
    })

    return { message: "Organization created", status: "success" }
  } catch (error) {
    const message = error instanceof Prisma.PrismaClientValidationError
      ? "Something went wrong"
      : error instanceof Error ? error.message : "Something went wrong"
    return {
      status: "error",
      message,
    }
  }

  // revalidatePath(ticketPath(ticketId))
  // return { message: "Comment created", status: "success" }
}
