"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ROLE } from "@prisma/client";
import { UserCog } from "lucide-react";
import { toast } from "sonner";
import updateMemberRole from "../actions/update-member-role";

interface MemberMoreMenuProps {
  profileId: string;
  organizationId: string;
  memberRole: ROLE
}

const MemberMoreMenu = ({ profileId, organizationId, memberRole }: MemberMoreMenuProps) => {

  const handleUpdateMemberRole = async (value: string) => {
    const promise = updateMemberRole({ profileId, organizationId, memberRole: value as ROLE })
    toast.promise(promise, { loading: "Updating role..." })

    const result = await promise;
    if (result.status === "error") {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <UserCog />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Roles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={memberRole}
          onValueChange={handleUpdateMemberRole}
        >
          <DropdownMenuRadioItem value={ROLE.ADMIN}>Admin</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={ROLE.MEMBER}>Member</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MemberMoreMenu;
