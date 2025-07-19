import { prisma } from "@/lib/prisma"
import { emailInvitationPath } from "@/paths";
import { generateRandomToken, hashToken } from "@/utils/crypto";
import { getBaseUrl } from "@/utils/urls";

export const generateInvitationLink = async (
  invitedBy: string,
  organizationId: string,
  email: string
) => {
  // We are deleting previous invitations to that email from specific organization
  // We also can set a deadline/duration/expire time for the invitation.
  await prisma.invitation.deleteMany({
    where: {
      email,
      organizationId
    }
  })

  const tokenId = generateRandomToken();
  const tokenHash = hashToken(tokenId);

  await prisma.invitation.create({
    data: {
      tokenHash,
      invitedById: invitedBy,
      organizationId,
      email
    }
  })

  const pageUrl = getBaseUrl() + emailInvitationPath;
  const emailInvitationLink = pageUrl + `/${tokenId}`

  return emailInvitationLink;
}
