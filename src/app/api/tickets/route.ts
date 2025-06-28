import { ParsedSearchParams } from "@/features/ticket/definitions"
import { getTickets } from "@/features/ticket/queries/get-tickets"

export async function GET() {

  const searchParams: ParsedSearchParams = new Promise((resolve) =>
    resolve({
      search: "",
      size: 5,
      page: 0,
      sort: "newest"
    })
  )
  const { list, metadata } = await getTickets(
    searchParams,
    undefined
  )
  return Response.json({ list, metadata })
}
