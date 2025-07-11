import { prisma } from "@/lib/prisma";
import { accountProfilePath, onboardingPath, organizationsPath, signInPath } from "@/paths";
import { createClient } from "@/utils/supabase/server";
import { Organization, Prisma, ROLE } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cache } from "react";

type ProfileWithOrganizations = Prisma.ProfileGetPayload<{
  include: {
    organizations: {
      include: {
        organization: {
          include: {
            _count: { select: { members: true } }
          }
        }
      }
    }
  }
}>
// interface AuthContext {
//   user: User
//   profile: ProfileWithOrganizations | null;
//   activeOrganization?: Organization;
//   organizationRole?: ROLE
// }

interface AuthContextWithProfile {
  user: User
  profile: ProfileWithOrganizations
  activeOrganization?: Organization;
  organizationRole?: ROLE
}

interface AuthContextWithoutProfile {
  user: User
  profile: null
  activeOrganization?: undefined
  organizationRole?: undefined
}

interface AuthOptions {
  requireProfile?: boolean
  requireOrganization?: boolean;
  requireActiveOrganization?: boolean
  requireRoleInOrganization?: ROLE
  allowedRoles?: ROLE[]
}

export const requireAuth = cache(async (options: AuthOptions = {}) => {
  const {
    requireProfile = true,
    requireOrganization,
    requireActiveOrganization,
    requireRoleInOrganization,
    allowedRoles
  } = options;

  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect(signInPath)
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
    include: {
      organizations: {
        include: {
          organization: {
            include: {
              _count: { select: { members: true } }
            }
          }
        }
      }
    }
  })

  if (requireProfile && !profile) {
    redirect(accountProfilePath)
  }

  if (!profile) {
    return {
      user,
      profile,
      activeOrganization: undefined,
      organizationRole: undefined,
    }
  }


  //GUARD: User should have at least ONE organization
  if (requireOrganization && profile.organizations.length === 0) {
    redirect(onboardingPath)
  }

  //GUARD: should have some active organization
  const activeUserOrganization = profile.organizations.find(org => org.isActive)
  const activeOrganization = activeUserOrganization?.organization
  if (requireActiveOrganization && !activeOrganization) {
    redirect(organizationsPath)
  }

  // TODO: we are validating the role in the active organization not in an specific one, it can be kinda buggy if not used correctly
  //GUARD: verify specific role in user-organization
  if (requireRoleInOrganization && activeUserOrganization?.role !== requireRoleInOrganization) {
    throw new Error(`Access denied`)
  }

  //GUARD: verify allowed roles in user-organization
  if (allowedRoles && !allowedRoles.includes(activeUserOrganization?.role as ROLE)) {
    throw new Error(`Access denied`)
  }

  return {
    user,
    profile,
    activeOrganization,
    organizationRole: activeUserOrganization?.role
  }
}) as {
  (): Promise<AuthContextWithProfile>
  (options: AuthOptions & { requireProfile: false }): Promise<AuthContextWithoutProfile>
  (options: AuthOptions): Promise<AuthContextWithProfile>
}

// as {
//   (): Promise<AuthContextWithProfile>
//   (options: AuthOptions & { requireProfile: false }): Promise<AuthContextWithoutProfile>
//   (options: AuthOptions): Promise<AuthContextWithProfile>
// }

// // For pages that need active organization
// export const requireActiveOrganization = cache(async (): Promise<AuthContext> => {
//   return requireAuth({
//     requireOrganization: true,
//     requireActiveOrganization: true
//   })
// })

// //For operations where org ADMIN is required
// export const requireAdmin = cache(async (): Promise<AuthContext> => {
//   return requireAuth({
//     requireOrganization: true,
//     requireActiveOrganization: true,
//     requireRoleInOrganization: 'ADMIN'
//   })
// })

// //For every member in organization
// export const requireMember = cache(async (): Promise<AuthContext> => {
//   return requireAuth({
//     requireOrganization: true,
//     requireActiveOrganization: true,
//     allowedRoles: ["ADMIN", "MEMBER"]
//   })
// })
