'use server'

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTicket(ticketId: string) {
  await prisma.ticket.delete({ where: { id: ticketId } })
  revalidatePath(ticketsPath)
  redirect(ticketsPath)
}
