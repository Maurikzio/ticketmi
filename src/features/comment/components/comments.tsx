import CardCompact from "@/components/card-compact";
import { getComments } from "../queries/get-comments";
import CommentItem from "./comment-item";
import CommentCreateform from "./comment-create-form";

interface CommentsProps {
  ticketId: string
}

const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId)

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateform ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-2 ml-8">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  )
}


export default Comments;
