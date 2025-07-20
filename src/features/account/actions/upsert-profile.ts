"use server"

import { requireAuth } from "@/features/auth/utils/require-auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function upsertProfile(data: { userName: string, userLastname: string }) {
  try {
    const context = await requireAuth({ requireProfile: false })

    // Check if profile exists before upsert
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: context.user.id }
    })
    const isCreating = !existingProfile

    const profile = await prisma.profile.upsert({
      where: {
        userId: context.user.id
      },
      update: {
        userName: data.userName,
        userLastname: data.userLastname
      },
      create: {
        userId: context.user.id,
        userName: data.userName,
        userLastname: data.userLastname,
        email: context.user.email!
      }
    })

    // If creating, create user organization/ MEMBER here
    if (isCreating) {
      const invitations = await prisma.invitation.findMany({
        where: {
          email: context.user.email!
        }
      })
      await prisma.$transaction([
        // Are we deleting ALL the user invitations, even from other organizations???
        prisma.invitation.deleteMany({
          where: {
            email: context.user.email!
          }
        }),
        // Are we creating the MEMBER for all the invitations, even tho we only clicked on 1 invitation????
        prisma.userOrganization.createMany({
          data: invitations.map(invitation => ({
            organizationId: invitation.organizationId,
            profileId: profile.id,
            role: "MEMBER",
            isActive: false,
          }))
        })
      ])
    }

    return { success: true, profile, message: isCreating ? 'Profile created' : 'Profile updated' }
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
