export type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE";

export type Ticket = {
  id: string;
  status: TicketStatus
  title: string;
  content: string
}
