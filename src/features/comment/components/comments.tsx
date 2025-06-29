import CardCompact from "@/components/card-compact";
import { getComments } from "../queries/get-comments";
import CommentItem from "./comment-item";
import CommentCreateform from "./comment-create-form";
import getProfile from "@/features/auth/queries/get-profile";

interface CommentsProps {
  ticketId: string
}

const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId)
  const data = await getProfile();

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateform ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-2 ml-8">
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isFromCurrentUser={data?.profile.id === comment.author?.id}
          />
        ))}
      </div>
    </>
  )
}


export default Comments;
