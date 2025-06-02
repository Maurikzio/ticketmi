import { Ticket } from "../ticket/definitions"
import { prisma } from "@/lib/prisma";

export const getTickets = async (): Promise<Ticket[]> => {
  return await prisma.ticket.findMany();
}
