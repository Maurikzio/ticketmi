'use server'

import { isOwner } from "@/features/auth/utils/is-owner";
import { requireProfile } from "@/features/auth/utils/requireProfile";
import { prisma } from "@/lib/prisma";
import { signInPath, ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    await prisma.ticket.delete({ where: { id: ticketId } })
  } catch (error) {
    console.error(error)
  }

  revalidatePath(ticketsPath)
  redirect(ticketsPath)
}
