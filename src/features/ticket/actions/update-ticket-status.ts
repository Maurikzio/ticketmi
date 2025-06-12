"use server"

import { TicketStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ticketsPath } from "@/paths";


export async function updateTicketStatus(id: string, status: TicketStatus) {
  try {
    await prisma.ticket.update({
      where: { id },
      data: { status }
    })
    revalidatePath(ticketsPath)
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
