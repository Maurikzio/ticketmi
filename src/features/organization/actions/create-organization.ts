"use server"

import { prisma } from "@/lib/prisma"
import { OrganizationFormState } from "../definitions"
import { z } from "zod"
import { Prisma } from "@prisma/client"
import { requireAuth } from "@/features/auth/utils/require-auth"

const createOrganizationSchema = z.object({
  name: z.string().min(1).max(191)
})

export const createOrganization = async (_actionState: OrganizationFormState, formData: FormData): Promise<OrganizationFormState> => {
  const context = await requireAuth()

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
    await prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name,
          members: {
            create: {
              profileId: context.profile.id,
              role: "ADMIN",
              isActive: true,
            }
          }
        },
      });

      await tx.userOrganization.updateMany({
        where: {
          profileId: context.profile.id,
          organizationId: {
            not: organization.id
          }
        },
        data: {
          isActive: false
        }
      })
    })

    // const organization = await prisma.organization.create({
    //   data: {
    //     name,
    //     members: {
    //       create: {
    //         profileId: context.profile.id,
    //         role: "ADMIN"
    //       }
    //     }
    //   },
    // })

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
