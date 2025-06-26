import { prisma } from "@/lib/prisma";

// export const getTickets = async (): Promise<Ticket[]> => {
export const getTickets = async (profileId?: string, search?: string) => {
  return await prisma.ticket.findMany({
    where: {
      profileId,
      title: {
        contains: search,
        mode: "insensitive"
      }
    },
    orderBy: [{ createdAt: 'desc' }],
    include: { profile: true }
  })
}
