import { serve } from "inngest/next"
import { inngest } from "@/lib/inngest"
import { InvitationCreatedEvent } from "@/features/organization/events/event-invitation-created"
import { attachmentDeletedEvent } from "@/features/attachments/events/event-attachment-deleted"

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    InvitationCreatedEvent,
    attachmentDeletedEvent
  ]
})
