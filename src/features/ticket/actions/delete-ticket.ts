'use server'

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTicket(ticketId: string) {
  //artifitial delay
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    await prisma.ticket.delete({ where: { id: ticketId } })
  } catch (error) {
    console.error(error)
  }

  revalidatePath(ticketsPath)
  redirect(ticketsPath)
}
