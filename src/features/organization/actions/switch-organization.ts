"use server"

import { prisma } from "@/lib/prisma"
import { organizationsPath, signInPath } from "@/paths"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { getOrganizationsByUser } from "../query/get-organizations-by-user"
import { requireAuth } from "@/features/auth/utils/require-auth"
import { redirect } from "next/navigation"

export const switchOrganization = async (organizationId: string) => {

  const context = await requireAuth({ requireOrganization: true })

  if (!context.profile) {
    redirect(signInPath)
  }

  try {
    const organizations = await getOrganizationsByUser();
    const canSwitch = organizations.some(org => org.member.organizationId === organizationId)
    if (!canSwitch) {
      return {
        status: "error",
        message: "Not a member of this organization"
      }
    }

    await prisma.$transaction([
      // Desactivar todas las organizaciones del profile Excepto la que vamos a activar.
      prisma.userOrganization.updateMany({
        where: {
          profileId: context.profile.id,
          organizationId: {
            not: organizationId // Todas EXCEPTO la aue vamos a activar
          }
        },
        data: {
          isActive: false // Desactivar todas las demas
        }
      }),
      // Activar la organizacion seleccionada
      prisma.userOrganization.update({
        where: {
          profileId_organizationId: {
            profileId: context.profile.id,
            organizationId // Solo esta organizacion
          }
        },
        data: {
          isActive: true // Activar la seleccionada
        }
      })
    ])

    revalidatePath(organizationsPath)
    return { message: "Active organization has been switched", status: "success" }
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
