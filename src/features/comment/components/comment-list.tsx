import AttachmentList from "@/features/attachments/components/attachment-list";
import { CommentWithMetadata } from "../definitions";
import CommentItem from "./comment-item";


type CommentListProps = {
  comments: CommentWithMetadata[];
  currentProfileId?: string
  handleDeleteComment: () => void;
};

const CommentList = ({
  comments,
  currentProfileId,
  handleDeleteComment
}: CommentListProps) => {
  return (
    <>
      {comments.map((comment) => {
        // const commentDeleteButton = (
        //   <CommentDeleteButton
        //     key="0"
        //     id={comment.id}
        //     onDeleteComment={onDeleteComment}
        //   />
        // );

        const sections = [];

        if (comment.attachments.length) {
          sections.push({
            label: "Attachments",
            content: <AttachmentList attachments={comment.attachments} isOwner={currentProfileId === comment.author?.id} refreshComments={handleDeleteComment} />
          })
        }


        return (
          <CommentItem
            key={comment.id}
            comment={comment}
            isFromCurrentUser={currentProfileId === comment.author?.id}
            refreshComments={handleDeleteComment}
            sections={sections}
          />
        );
      })}
    </>
  );
};

export { CommentList };
