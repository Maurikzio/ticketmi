"use server"

import { requireAuth } from "@/features/auth/utils/require-auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function upsertProfile(data: { userName: string, userLastname: string }) {
  try {
    const context = await requireAuth({ requireProfile: false })

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


    return { success: true, profile, message: profile ? 'Profile updated' : 'Profile created' }
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
