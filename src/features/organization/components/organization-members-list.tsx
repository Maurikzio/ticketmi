import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOrganizationMembers } from "../query/get-organization-members";
import { format } from "date-fns";


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
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizationMembers?.members.map((om) => {
            const { id, profile, joinedAt } = om;
            return (
              <TableRow key={id}>
                <TableCell className="font-medium">{`${profile.userName} ${profile.userLastname}`}</TableCell>
                <TableCell>{format(joinedAt, "yyy-MM-dd , HH:mm")}</TableCell>
                <TableCell>{om.profile.email}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrganizationMembersList;
