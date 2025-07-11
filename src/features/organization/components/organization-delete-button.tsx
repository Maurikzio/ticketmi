"use client"

import { Button } from "@/components/ui/button";
import useConfirmDialog from "@/components/use-confirm-dialog-feedback-toast-and-trigger";
import { LoaderCircle, Trash } from "lucide-react";
import { deleteOrganization } from "../actions/delete-organization";

interface OrganizationDeleteButtonProps {
  organizationId: string;
}

const OrganizationDeleteButton = ({ organizationId }: OrganizationDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteOrganization.bind(null, organizationId),
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

export default OrganizationDeleteButton;
