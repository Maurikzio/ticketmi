import { getActiveUserOrganization } from "@/features/organization/query/get-active-user-organization"
import { prisma } from "@/lib/prisma"

// export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
export const getTicket = async (ticketId: string) => {
  const activeMembership = await getActiveUserOrganization();

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId
    },
    include: {
      profile: true
    }
  })

  if (!ticket) return null

  return { ...ticket, permissions: { canDeleteTicket: !!activeMembership?.canDeleteTicket } }
}
