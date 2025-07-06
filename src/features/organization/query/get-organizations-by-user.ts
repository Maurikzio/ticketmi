import { prisma } from "@/lib/prisma"
import { signInPath } from "@/paths"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export const getOrganizationsByUser = async () => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect(signInPath)
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id }
  })

  if (!profile) {
    redirect(signInPath)
  }

  const userOrganizations = await prisma.userOrganization.findMany({
    where: {
      userId: user.id
    },
    include: {
      organization: true
    }
  })

  return userOrganizations;
}
