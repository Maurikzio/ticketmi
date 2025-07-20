"use client"

import { Button } from "@/components/ui/button";
import useConfirmDialog from "@/components/use-confirm-dialog-feedback-toast-and-trigger";
import { LoaderCircle, Trash } from "lucide-react";
import { deleteInvitation } from "../actions/delete-invitation";

interface InvitationDeleteButtonProps {
  email: string;
  organizationId: string;
}

const InvitationDeleteButton = ({ email, organizationId }: InvitationDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteInvitation.bind(null, { email, organizationId }),
    trigger: (isPending) => (
      <Button variant="destructive" size="icon">
        {isPending ? (
          <LoaderCircle className="w-4 h-4 animate-spin" />
        ) : (
          <Trash className="w-4 h-4" />
        )}
      </Button>
    ),
    // onSuccessAction: handleDeleteComment
  })

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  )
};

export default InvitationDeleteButton;
