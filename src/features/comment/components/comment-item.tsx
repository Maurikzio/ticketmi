import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../definitions";
import CommentDeleteButton from "./comment-delete-button";
import { format } from "date-fns"
import { AttachmentEntity } from "@prisma/client";
import AttachmentCreateButton from "@/features/attachments/components/attchment-create-button";
import { Separator } from "@/components/ui/separator";

interface CommentItemProps {
  comment: CommentWithMetadata
  isFromCurrentUser: boolean
  refreshComments: () => void,
  sections: {
    label: string;
    content: React.ReactNode
  }[]
}

const CommentItem = ({ comment, isFromCurrentUser, refreshComments, sections }: CommentItemProps) => {
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
        {sections.map(section => (
          <div key={section.label} className="space-y-2 mt-2">
            <Separator />
            <h4 className="text-sm text-muted-foreground" >{section.label}</h4>
            <div>
              {section.content}
            </div>
          </div>
        ))}
      </Card>
      {isFromCurrentUser ? <AttachmentCreateButton entityId={comment.id} entity={AttachmentEntity.COMMENT} refreshComments={refreshComments} /> : null}
      {isFromCurrentUser ? <CommentDeleteButton commentId={comment.id} handleDeleteComment={refreshComments} /> : null}
    </div>
  )
};

export default CommentItem;
