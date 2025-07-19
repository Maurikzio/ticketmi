import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { sendEmailInvitation } from "../emails/send-email-invitation";

export type InvitationCreateEventArgs = {
  data: {
    profileId: string;
    organizationId: string;
    email: string;
    emailInvitationLink: string;
  }
}

export const InvitationCreatedEvent = inngest.createFunction(
  { id: "invitation-created" },
  { event: "app/invitation.created" },
  async ({ event }) => {
    const { profileId, organizationId, email, emailInvitationLink } = event.data;

    const profile = await prisma.profile.findUniqueOrThrow({
      where: {
        id: profileId
      }
    })

    const organization = await prisma.organization.findUniqueOrThrow({
      where: {
        id: organizationId
      }
    })

    const result = await sendEmailInvitation(
      profile.userName,
      organization.name,
      email,
      emailInvitationLink
    )

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`)
    }

    return { event, body: true }
  }
)
