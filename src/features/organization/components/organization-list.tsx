
import { format } from "date-fns";
import { getOrganizationsByUser } from "../query/get-organizations-by-user";
import { redirect } from "next/navigation";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, ArrowUpRightFromSquare, Pen, Trash } from "lucide-react";

const OrganizationList = async () => {
  const userOrganizations = await getOrganizationsByUser();

  if (!userOrganizations.length) {
    redirect('/onboarding')
  }

  return (
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
          const switchButton = <Button variant="outline" size="icon">
            <ArrowLeftRight className="w-4 h-4" />
          </Button>
          const detailButton = <Button variant="outline" size="icon">
            <ArrowUpRightFromSquare className="w-4 h-4" />
          </Button>
          const editButton = <Button variant="outline" size="icon">
            <Pen className="w-4 h-4" />
          </Button>
          const deleteButton = <Button variant="destructive" size="icon">
            <Trash className="w-4 h-4" />
          </Button>

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
  )
}
export default OrganizationList;
