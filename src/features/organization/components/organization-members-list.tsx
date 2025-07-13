import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOrganizationMembers } from "../query/get-organization-members";
import { format } from "date-fns";
import MemberDeleteButton from "./member-delete-button";
import MemberMoreMenu from "./member-more-menu";
import PermissionToggle from "./permission-toggle";

interface OrganizationMembersListProps {
  organizationId: string;
}

const OrganizationMembersList = async ({ organizationId }: OrganizationMembersListProps) => {
  const organizationMembers = await getOrganizationMembers(organizationId);

  return (
    <div>
      <Table>
        <TableCaption>A list of members</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Joined At</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Can delete Ticket?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizationMembers?.members.map((om) => {
            const { id, profile, joinedAt } = om;
            const memberMoreMenu = (
              <MemberMoreMenu
                profileId={profile.id}
                organizationId={om.organizationId}
                memberRole={om.role}
              />
            )
            const deleteButton = <MemberDeleteButton organizationId={om.organizationId} profileId={profile.id} />

            const buttons = <div className="flex gap-2">
              {memberMoreMenu}
              {deleteButton}
            </div>
            return (
              <TableRow key={id}>
                <TableCell className="font-medium">{`${profile.userName} ${profile.userLastname}`}</TableCell>
                <TableCell>{format(joinedAt, "yyy-MM-dd , HH:mm")}</TableCell>
                <TableCell>{om.profile.email}</TableCell>
                <TableCell>{om.role}</TableCell>
                <TableCell>
                  <PermissionToggle
                    profileId={om.profileId}
                    organizationId={om.organizationId}
                    permissionKey="canDeleteTicket"
                    permissionValue={om.canDeleteTicket}
                  />
                </TableCell>
                <TableCell>{buttons}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrganizationMembersList;
