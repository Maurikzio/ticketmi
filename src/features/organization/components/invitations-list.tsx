import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOrganizationInvitations } from "../query/get-organization-invitations";
import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { format } from "date-fns";


interface InvitationListProps {
  organizationId: string
}

const InvitationList = async ({ organizationId }: InvitationListProps) => {
  const invitations = await getOrganizationInvitations(organizationId);

  if (!invitations.length) {
    return (
      <Placeholder label="No invitations for this organization" />
    )
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of Invitations</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Email</TableHead>
            <TableHead>Invited at</TableHead>
            <TableHead>Invited By</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((invitation) => {
            const { email, createdAt, invitedBy } = invitation;

            const invitedByName = invitedBy
              ? `${invitedBy?.userName} ${invitedBy?.userLastname[0]}.`
              : "Deleted User"

            // const deleteButton = <MemberDeleteButton organizationId={om.organizationId} profileId={profile.id} />
            const deleteButton = (
              <Button variant="destructive" size="icon">
                <Trash className="w-4 h-4" />
              </Button>
            )
            const buttons = <div className="flex gap-2">
              {deleteButton}
            </div>
            return (
              <TableRow key={email}>
                <TableCell>{email}</TableCell>
                <TableCell className="font-medium">{format(createdAt, "yyy-MM-dd , HH:mm")}</TableCell>
                <TableCell>{invitedByName}</TableCell>
                <TableCell>{buttons}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
};

export default InvitationList;
