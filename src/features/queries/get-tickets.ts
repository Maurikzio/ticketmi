import { initialTickets } from "@/data"
import { Ticket } from "../ticket/definitions"

export const getTickets = async (): Promise<Ticket[]> => {

  // 2 seconds delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // for testing purposes only
  // throw new Error("Failed to fetch tickets")

  return new Promise((resolve) => {
    resolve(initialTickets)
  })
}
