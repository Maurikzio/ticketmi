"use client"

import Breadcrumbs from "@/components/breadrumbs";
import { invitationsPath, organizationMembersPath, organizationsPath } from "@/paths";
import { useParams, usePathname } from "next/navigation";

const OrganizationBreadcrumbs = () => {
  const params = useParams<{ organizationId: string }>()
  const pathname = usePathname()

  const title = {
    members: "Members" as const,
    invitations: "Invitations" as const,
  }[pathname.split('/').at(-1) as "members" | "invitations"];

  return (
    <Breadcrumbs
      breadcrumbs={[
        { title: "Organizations", href: organizationsPath },
        // { title, href: organizationMembersPath(params.organizationId) },
        {
          title,
          dropdown: [
            { title: "Members", href: organizationMembersPath(params.organizationId) },
            { title: "Invitations", href: invitationsPath(params.organizationId) },
          ]
        }
      ]}
    />
  )
};

export default OrganizationBreadcrumbs;
