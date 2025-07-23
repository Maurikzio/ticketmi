"use client"

import { Button } from "@/components/ui/button";
import useConfirmDialog from "@/components/use-confirm-dialog-feedback-toast-and-trigger";
import { LoaderCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteAttachment } from "../actions/delete-attachment";

interface AttachmentDeleteButtonProps {
  id: string;
}

const AttachmentDeleteButton = ({ id }: AttachmentDeleteButtonProps) => {
  const router = useRouter()
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteAttachment.bind(null, id),
    trigger: (isPending) => (
      <Button variant="ghost" size="xs">
        {isPending ? (
          <LoaderCircle className="w-4 h-4 animate-spin" />
        ) : (
          <Trash className="w-4 h-4" />
        )}
      </Button>
    ),
    onSuccessAction: () => {
      router.refresh()
    }
  })

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  )
};

export default AttachmentDeleteButton;
