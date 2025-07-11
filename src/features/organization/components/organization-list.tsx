
import { format } from "date-fns";
import { getOrganizationsByUser } from "../query/get-organizations-by-user";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, ArrowLeftRight, ArrowUpRightFromSquare, Pen } from "lucide-react";
import OrganizationSwitchButton from "./organization-switch-button";
import SubmitButton from "@/components/form/submit-button-iconed";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import OrganizationDeleteButton from "./organization-delete-button";
import Link from "next/link";
import { organizationMembers } from "@/paths";
import MemberDeleteButton from "./member-delete-button";

const OrganizationList = async () => {
  const userOrganizations = await getOrganizationsByUser();

  const hasOrganizationActive = userOrganizations.some(uo => uo.member.isActive);

  return (
    <>
      {!hasOrganizationActive ? <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to continue?</AlertTitle>
        <AlertDescription>
          <p>Please verify your organization information and try again.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Check you have a valid organization</li>
            <li>Ensure you have an active organization.</li>
          </ul>
        </AlertDescription>
      </Alert> : null}
      <Table>
        <TableCaption>A list of organizations you are part of</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Joined At</TableHead>
            <TableHead >Members</TableHead>
            <TableHead >My Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userOrganizations.map((uo) => {
            let label = "Active";
            const isActive = uo.member.isActive;
            const isAdmin = uo.member.role === "ADMIN";

            if (!hasOrganizationActive) {
              label = "Activate"
            } else if (isActive) {
              label = "Active"
            } else {
              label = "Switch"
            }
            const placeholderButton = <Button size="icon" disabled className="disabled:opacity-0" />
            const switchButton =
              <OrganizationSwitchButton
                organizationId={uo.id}
                trigger={
                  <SubmitButton
                    icon={<ArrowLeftRight />}
                    label={label}
                    variant={isActive ? "default" : "outline"}
                  />
                }
              />

            const detailButton = hasOrganizationActive && isAdmin ? (
              <Button variant="outline" size="icon" asChild>
                <Link href={organizationMembers(uo.id)}>
                  <ArrowUpRightFromSquare className="w-4 h-4" />
                </Link>
              </Button>
            ) : placeholderButton;
            const editButton = hasOrganizationActive && isAdmin ? <Button variant="outline" size="icon">
              <Pen className="w-4 h-4" />
            </Button> : placeholderButton;
            const leaveButton = hasOrganizationActive ? (
              <MemberDeleteButton organizationId={uo.id} profileId={uo.member.profileId} />
            ) : placeholderButton;
            const deleteButton = hasOrganizationActive && isAdmin ?
              <OrganizationDeleteButton
                organizationId={uo.id}
              /> : placeholderButton

            const buttons = (
              <>
                {switchButton}
                {detailButton}
                {editButton}
                {leaveButton}
                {deleteButton}
              </>
            )

            return (
              <TableRow key={uo.id}>
                <TableCell className="font-medium">{uo.id}</TableCell>
                <TableCell >{uo.name}</TableCell>
                <TableCell>{format(uo.member.joinedAt, "yyy-MM-dd , HH:mm")}</TableCell>
                <TableCell>{uo._count.members}</TableCell>
                <TableCell>{uo.member.role}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  {buttons}
                </TableCell>

              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
export default OrganizationList;
