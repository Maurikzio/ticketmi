import { prisma } from "@/lib/prisma"
import { Ticket } from "@prisma/client"

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  return await prisma.ticket.findUnique({
    where: {
      id: ticketId
    }
  })
}
