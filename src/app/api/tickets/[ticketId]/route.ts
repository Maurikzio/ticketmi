import { getTicket } from "@/features/ticket/queries/get-ticket"

type RouteParams = {
  params: {
    ticketId: string;
  }
}
export async function GET(_request: Request, { params }: RouteParams) {
  const ticket = await getTicket(params.ticketId)
  return Response.json(ticket)
}
