import { Ticket } from "../ticket/definitions"
import { prisma } from "@/lib/prisma"

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  return await prisma.ticket.findUnique({
    where: {
      id: ticketId
    }
  })
}
