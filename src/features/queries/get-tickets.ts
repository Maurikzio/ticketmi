import { prisma } from "@/lib/prisma";
import { Ticket } from "@prisma/client";

export const getTickets = async (): Promise<Ticket[]> => {
  return await prisma.ticket.findMany();
}
