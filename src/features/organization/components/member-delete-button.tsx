"use client"

import { Button } from "@/components/ui/button";
import useConfirmDialog from "@/components/use-confirm-dialog-feedback-toast-and-trigger";
import { LoaderCircle, LogOut } from "lucide-react";
import { deleteOrganizationMember } from "../actions/delete-organization-member";
import { useRouter } from "next/navigation";

interface DeleteMemberButtonProps {
  organizationId: string;
  profileId: string;
}

const MemberDeleteButton = ({ profileId, organizationId }: DeleteMemberButtonProps) => {
  const route = useRouter();
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteOrganizationMember.bind(null, { profileId, organizationId }),
    trigger: (isPending) => (
      <Button variant="destructive" size="icon">
        {isPending ? (
          <LoaderCircle className="w-4 h-4 animate-spin" />
        ) : (
          <LogOut className="w-4 h-4" />
        )}
      </Button>
    ),
    onSuccessAction: () => {
      route.refresh()
    }
  })

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  )
}


export default MemberDeleteButton;
