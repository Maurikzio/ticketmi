
import { format } from "date-fns";
import { getOrganizationsByUser } from "../query/get-organizations-by-user";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, ArrowLeftRight, ArrowUpRightFromSquare, Pen } from "lucide-react";
import OrganizationSwitchButton from "./organization-switch-button";
import SubmitButton from "@/components/form/submit-button-iconed";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import OrganizationDeleteButton from "./organization-delete-button";

const OrganizationList = async () => {
  const userOrganizations = await getOrganizationsByUser();

  const hasOrganizationActive = userOrganizations.some(uo => uo.member.isActive);

  return (
    <>
      {!hasOrganizationActive ? <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to continue</AlertTitle>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {userOrganizations.map((uo) => {
            const isActive = uo.member.isActive;
            const switchButton =
              <OrganizationSwitchButton
                organizationId={uo.id}
                trigger={
                  <SubmitButton
                    icon={<ArrowLeftRight />}
                    label={isActive ? "Active" : "Switch"}
                    variant={isActive ? "default" : "outline"}
                  />
                }
              />

            const detailButton = <Button variant="outline" size="icon">
              <ArrowUpRightFromSquare className="w-4 h-4" />
            </Button>
            const editButton = <Button variant="outline" size="icon">
              <Pen className="w-4 h-4" />
            </Button>
            const deleteButton =
              <OrganizationDeleteButton
                organizationId={uo.id}
              />

            const buttons = (
              <>
                {switchButton}
                {detailButton}
                {editButton}
                {deleteButton}
              </>
            )

            return (
              <TableRow key={uo.id}>
                <TableCell className="font-medium">{uo.id}</TableCell>
                <TableCell >{uo.name}</TableCell>
                <TableCell>{format(uo.member.joinedAt, "yyy-MM-dd , HH:mm")}</TableCell>
                <TableCell>{uo._count.members}</TableCell>
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
