import { serve } from "inngest/next"
import { inngest } from "@/lib/inngest"
import { InvitationCreatedEvent } from "@/features/organization/events/event-invitation-created"

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [InvitationCreatedEvent] //TODO: register functions
})
