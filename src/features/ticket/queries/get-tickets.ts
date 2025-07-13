import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../definitions";
import { requireProfile } from "@/features/auth/utils/requireProfile";
import { getActiveOrganization } from "./get-active-organization";

// export const getTickets = async (): Promise<Ticket[]> => {
export const getTickets = async (searchParams: ParsedSearchParams, byOrganization?: boolean) => {
  const { search, sort, page, size } = await searchParams;
  const profileData = await requireProfile();
  const activeOrganization = await getActiveOrganization();

  const skip = page * size;
  const take = size;

  const where = {
    profileId: profileData?.profile.id,
    title: {
      contains: search,
      mode: "insensitive" as const
    },
    ...(byOrganization && activeOrganization
      ? { organizationId: activeOrganization.id }
      : {})
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
