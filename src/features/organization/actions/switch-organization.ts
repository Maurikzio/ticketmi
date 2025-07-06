"use server"

import { prisma } from "@/lib/prisma"
import { requireProfile } from "@/features/auth/utils/requireProfile"
import { redirect } from "next/navigation"
import { organizationsPath, signInPath } from "@/paths"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { getOrganizationsByUser } from "../query/get-organizations-by-user"

export const switchOrganization = async (organizationId: string) => {
  const userData = await requireProfile();

  if (!userData) {
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
    // Desactivar todas las organizaciones del profile Excepto la que vamos a activar.
    await prisma.userOrganization.updateMany({
      where: {
        profileId: userData.profile.id,
        organizationId: {
          not: organizationId // TOdas EXCEPTO la aue vamos a activar
        }
      },
      data: {
        isActive: false // Desactivar todas las demas
      }
    })

    // Activar la organizacion seleccionada
    await prisma.userOrganization.update({
      where: {
        profileId_organizationId: {
          profileId: userData.profile.id,
          organizationId // Solo esta organizacion
        }
      },
      data: {
        isActive: true // Activar la seleccionada
      }
    })

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
