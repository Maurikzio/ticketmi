import { Profile } from "@prisma/client";

interface Entity {
  profileId?: string
}

export const isOwner = (profile?: Profile, entity?: Entity) => {
  const invalidParams = !profile || !entity;
  const differentIds = entity?.profileId !== profile?.id;

  if (invalidParams || !entity.profileId || differentIds) {
    return false
  }

  return true
}
