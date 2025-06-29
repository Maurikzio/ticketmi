import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../definitions";
import CommentDeleteButton from "./comment-delete-button";
import { format } from "date-fns"

interface CommentItemProps {
  comment: CommentWithMetadata
  isFromCurrentUser: boolean
}

const CommentItem = ({ comment, isFromCurrentUser }: CommentItemProps) => {
  const commentAuthor = comment.author
    ? `${comment.author.userName} ${comment.author.userLastname[0]}.`
    : "Anonymous User"

  return (
    <div className="flex gap-x-2">
      <Card className="p-4 flex-1 flex flex-col gap-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">{commentAuthor}</p>
          <p className="text-sm text-muted-foreground">
            {/* {comment.createdAt.toLocaleString()} */}
            {format(comment.createdAt, "yyyy-MM-dd, HH:mm")}
          </p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>
      {isFromCurrentUser ? <CommentDeleteButton commentId={comment.id} /> : null}
    </div>
  )
};

export default CommentItem;
