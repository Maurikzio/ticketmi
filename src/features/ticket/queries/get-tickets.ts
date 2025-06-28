import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../definitions";

// export const getTickets = async (): Promise<Ticket[]> => {
export const getTickets = async (searchParams: ParsedSearchParams, profileId?: string,) => {
  const { search, sort, page, size } = await searchParams;

  const skip = page * size;
  const take = size;
  const tickets = await prisma.ticket.findMany({
    where: {
      profileId,
      title: {
        contains: search,
        mode: "insensitive"
      }
    },
    skip,
    take,
    orderBy: sort === 'bounty' ? { bounty: 'desc' } : { createdAt: 'desc' },
    include: { profile: true }
  })
  const count = await prisma.ticket.count({
    where: {
      profileId,
      title: {
        contains: search,
        mode: "insensitive"
      }
    },
  })

  return {
    list: tickets,
    metadata: {
      count,
      hasNextPage: count > skip + take
    }
  }
}
