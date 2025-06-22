import { prisma } from "@/lib/prisma";

// export const getTickets = async (): Promise<Ticket[]> => {
export const getTickets = async () => {
  return await prisma.ticket.findMany({
    orderBy: [{ createdAt: 'desc' }],
    include: { profile: true }
  })
}
