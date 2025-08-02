import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Placeholder from "@/components/placeholder";
import { format } from "date-fns";
import { getCredentials } from "../queries/get-credentials";


interface CredentialListProps {
  organizationId: string
}

const CredentialList = async ({ organizationId }: CredentialListProps) => {
  const credentials = await getCredentials(organizationId);

  if (!credentials.length) {
    return (
      <Placeholder label="No credemtials for this organization" />
    )
  }

  // Displaying all info but not the hash!!!
  return (
    <div>
      <Table>
        <TableCaption>A list of Credentials</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {credentials.map((credential) => {

            const buttons = <></>
            return (
              <TableRow key={credential.id}>
                <TableCell>{credential.name}</TableCell>
                <TableCell className="font-medium">{format(credential.createdAt, "yyy-MM-dd , HH:mm")}</TableCell>
                <TableCell>{credential.lastUsed ? format(credential.lastUsed, "yyyy-MM-dd, HH:mm") : "Never"}</TableCell>
                <TableCell className="flex justify-end gap-2">{buttons}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
};

export default CredentialList;
