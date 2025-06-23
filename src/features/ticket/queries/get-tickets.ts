import { prisma } from "@/lib/prisma";

// export const getTickets = async (): Promise<Ticket[]> => {
export const getTickets = async (profileId?: string) => {
  return await prisma.ticket.findMany({
    where: { profileId },
    orderBy: [{ createdAt: 'desc' }],
    include: { profile: true }
  })
}
