'use client'

import CardCompact from "@/components/card-compact";
import CommentItem from "./comment-item";
import CommentCreateform from "./comment-create-form";
import { CommentWithMetadata } from "../definitions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getComments } from "../queries/get-comments";

interface CommentsProps {
  ticketId: string
  paginatedComments: {
    list: CommentWithMetadata[]
    metadata: { count: number, hasNextPage: boolean }
  }
  currentProfileId?: string
}

const Comments = ({ ticketId, paginatedComments, currentProfileId }: CommentsProps) => {
  const [comments, setComments] = useState(paginatedComments.list)
  const [hasNextPage, setHasNextPage] = useState(paginatedComments.metadata.hasNextPage)

  const handleMore = async () => {
    const { list, metadata } = await getComments(ticketId, comments.length);
    setComments([...comments, ...list]);
    setHasNextPage(metadata.hasNextPage)
  }

  const handleDeleteComment = (id: string) => {
    setComments((prevComments) => prevComments.filter(comm => comm.id !== id))
  }

  const handleCreateComment = (comment: CommentWithMetadata) => {
    setComments((prevComments) => [comment, ...prevComments])
  }

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateform ticketId={ticketId} onSucessAction={handleCreateComment} />}
      />
      <div className="flex flex-col gap-2 ml-8">
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isFromCurrentUser={currentProfileId === comment.author?.id}
            handleDeleteComment={() => handleDeleteComment(comment.id)}
          />
        ))}
      </div>
      {hasNextPage ? <div className="flex flex-col justify-center ml-8">
        <Button variant="ghost" onClick={handleMore}>More</Button>
      </div> : null}
    </>
  )
}


export default Comments;
