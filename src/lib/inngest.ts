import { InvitationCreateEventArgs } from "@/features/organization/events/event-invitation-created"
import { EventSchemas, Inngest } from "inngest"

type Events = {
  "app/invitation.created": InvitationCreateEventArgs
}

export const inngest = new Inngest({
  id: "ticketmi",
  name: "TicketMi App",
  schemas: new EventSchemas().fromRecord<Events>()
})
