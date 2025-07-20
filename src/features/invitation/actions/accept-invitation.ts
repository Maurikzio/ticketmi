"use server"

import { prisma } from "@/lib/prisma"
import { organizationsPath, signUpPath } from "@/paths"
import { hashToken } from "@/utils/crypto"
import { Prisma } from "@prisma/client"

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

      return {
        status: "success",
        message: "Invitation accepted",
        redirectTo: organizationsPath
      }
    } else {
      await prisma.invitation.update({
        where: {
          tokenHash,
        },
        data: {
          status: "ACCEPTED_WITHOUT_ACCOUNT"
        }
      })

      return {
        status: "success",
        message: "Invitation accepted",
        redirectTo: signUpPath
      }
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
