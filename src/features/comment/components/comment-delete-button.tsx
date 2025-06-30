"use client"

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteComment } from "../actions/delete-comment";
import useConfirmDialog from "@/components/use-confirm-dialog-no-block";

interface CommentDeleteButtonProps {
  commentId: string;
  handleDeleteComment: () => void;
}

const CommentDeleteButton = ({ commentId, handleDeleteComment }: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, commentId),
    trigger: (
      <Button variant="outline" size="icon">
        <Trash className="w-4 h-4" />
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
