'use server'

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function deleteTicket(ticketId: string) {
  await prisma.ticket.delete({ where: { id: ticketId } })
  redirect('/tickets')
}
