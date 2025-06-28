import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../definitions";

// export const getTickets = async (): Promise<Ticket[]> => {
export const getTickets = async (searchParams: ParsedSearchParams, profileId?: string,) => {
  const { search, sort, page, size } = await searchParams;

  const skip = page * size;
  const take = size;

  const where = {
    profileId,
    title: {
      contains: search,
      mode: "insensitive" as const
    }
  };

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: sort === 'bounty' ? { bounty: 'desc' } : { createdAt: 'desc' },
      include: { profile: true }
    }),
    prisma.ticket.count({
      where
    })
  ])

  return {
    list: tickets,
    metadata: {
      count,
      hasNextPage: count > skip + take
    }
  }
}
