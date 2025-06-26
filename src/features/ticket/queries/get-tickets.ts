import { prisma } from "@/lib/prisma";

// export const getTickets = async (): Promise<Ticket[]> => {
export const getTickets = async (profileId?: string, search?: string, sort?: string) => {
  return await prisma.ticket.findMany({
    where: {
      profileId,
      title: {
        contains: search,
        mode: "insensitive"
      }
    },
    orderBy: sort === 'bounty' ? { bounty: 'desc' } : { createdAt: 'desc' },
    include: { profile: true }
  })
}
