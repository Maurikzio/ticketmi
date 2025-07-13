'use server'

import { isOwner } from "@/features/auth/utils/is-owner";
import { requireProfile } from "@/features/auth/utils/requireProfile";
import { prisma } from "@/lib/prisma";
import { signInPath, ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getTicketPermissions } from "../queries/get-ticket-permissions";

export async function deleteTicket(ticketId: string) {
  //artifitial delay
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const profileData = await requireProfile()
  if (!profileData) {
    redirect(signInPath)
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  })

  if (!ticket || !isOwner(profileData.profile, ticket)) {
    return {
      message: "Unauthorized",
      status: "error",
    }
  }

  try {
    const permissions = await getTicketPermissions({ organizationId: ticket.organizationId, profileId: profileData.profile.id });
    if (!permissions.canDeleteTicket) {
      return {
        message: "Not Authorized",
        status: "error",
      }
    }
    await prisma.ticket.delete({ where: { id: ticketId } })
  } catch (error) {
    console.error(error)
  }

  revalidatePath(ticketsPath)
  redirect(ticketsPath)
}
