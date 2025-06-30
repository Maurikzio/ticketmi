"use client"

import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash } from "lucide-react";
import { deleteComment } from "../actions/delete-comment";
import useConfirmDialog from "@/components/use-confirm-dialog-feedback-toast-and-trigger";

interface CommentDeleteButtonProps {
  commentId: string;
  handleDeleteComment: () => void;
}

const CommentDeleteButton = ({ commentId, handleDeleteComment }: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, commentId),
    trigger: (isPending) => (
      <Button variant="outline" size="icon">
        {isPending ? (
          <LoaderCircle className="w-4 h-4 animate-spin" />
        ) : (
          <Trash className="w-4 h-4" />
        )}
      </Button>
    ),
    onSuccessAction: handleDeleteComment
  })

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  )
}

export default CommentDeleteButton;
