import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../definitions";

interface CommentItemProps {
  comment: CommentWithMetadata
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const commentAuthor = comment.author
    ? `${comment.author.userName} ${comment.author.userLastname[0]}.`
    : "Anonymous User"

  return (
    <Card className="p-4 flex-1 flex flex-col gap-y-1">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">{commentAuthor}</p>
        <p className="text-sm text-muted-foreground">{comment.createdAt.toLocaleString()}</p>
      </div>
      <p className="whitespace-pre-line">{comment.content}</p>
    </Card>
  )
};

export default CommentItem;
