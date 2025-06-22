"use server"

import { TicketStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { signInPath, ticketsPath } from "@/paths";
import { requireProfile } from "@/features/auth/utils/requireProfile";
import { redirect } from "next/navigation";
import { isOwner } from "@/features/auth/utils/is-owner";


export async function updateTicketStatus(id: string, status: TicketStatus) {
  const profileData = await requireProfile()
  if (!profileData) {
    redirect(signInPath)
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id },
  })

  if (!ticket || !isOwner(profileData.profile, ticket)) {
    return {
      message: "Unauthorized",
      status: "error" as const,
    }
  }

  try {
    await prisma.ticket.update({
      where: {
        id,
        // profileId: profileData.profile.id
      },
      data: { status }
    })
    revalidatePath(ticketsPath)
    // return true;
    return {
      message: "Status updated",
      status: "success" as const,
    }
  } catch (error: unknown) {
    console.error(error);
    // return false;
    return {
      message: error instanceof Error ? error.message : "Error updating status",
      status: "error" as const,
    }
  }
}
