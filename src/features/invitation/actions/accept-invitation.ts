"use server"

import { prisma } from "@/lib/prisma"
import { signInPath } from "@/paths"
import { hashToken } from "@/utils/crypto"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"

export const acceptInvitation = async (tokenId: string) => {
  try {
    const tokenHash = hashToken(tokenId)

    const invitation = await prisma.invitation.findUnique({
      where: {
        tokenHash
      }
    })

    if (!invitation) {
      return {
        status: "error",
        message: "Revoked or invalid verification token"
      }
    }

    const profile = await prisma.profile.findUnique({
      where: {
        email: invitation.email
      }
    })

    if (profile) {
      await prisma.$transaction([
        prisma.invitation.delete({
          where: {
            tokenHash,
          }
        }),
        prisma.userOrganization.create({
          data: {
            organizationId: invitation.organizationId,
            profileId: profile.id,
            role: "MEMBER",
            isActive: false
          }
        })
      ])
      redirect("/organization")
    } else {

      redirect(signInPath)
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
