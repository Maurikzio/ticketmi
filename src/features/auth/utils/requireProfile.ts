import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { Profile } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import { cache } from "react";

type RequiredProfile = {
  user: User;
  profile: Profile
} | null;

export const requireProfile = cache(async (): Promise<RequiredProfile> => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id }
  })

  if (!profile) {
    return null;
  }

  return { user, profile }
})
