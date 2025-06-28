import { ParsedSearchParams, searchParamsCache } from "@/features/ticket/definitions"
import { getTickets } from "@/features/ticket/queries/get-tickets"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Convertir a Promise de forma más directa
  const searchParamsPromise = Promise.resolve(Object.fromEntries(searchParams));
  const typedSearchParams: ParsedSearchParams = searchParamsCache.parse(searchParamsPromise);

  const { list, metadata } = await getTickets(typedSearchParams, undefined);
  return Response.json({ list, metadata });
}
