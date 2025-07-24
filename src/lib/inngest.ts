import { AttachmentDeletedEventArgs } from "@/features/attachments/events/event-attachment-deleted"
import { InvitationCreateEventArgs } from "@/features/organization/events/event-invitation-created"
import { EventSchemas, Inngest } from "inngest"

type Events = {
  "app/invitation.created": InvitationCreateEventArgs,
  "app/attachment.deleted": AttachmentDeletedEventArgs
}

export const inngest = new Inngest({
  id: "ticketmi",
  name: "TicketMi App",
  schemas: new EventSchemas().fromRecord<Events>()
})
