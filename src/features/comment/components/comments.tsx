'use client'

import CardCompact from "@/components/card-compact";
import CommentItem from "./comment-item";
import CommentCreateform from "./comment-create-form";
import { CommentWithMetadata } from "../definitions";
import { Button } from "@/components/ui/button";
import { getComments } from "../queries/get-comments";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useCallback } from "react";
interface CommentsProps {
  ticketId: string
  initialData: {
    list: CommentWithMetadata[]
    metadata: { count: number, hasNextPage: boolean, nextCursor?: string }
  }
  currentProfileId?: string
}

const Comments = ({ ticketId, initialData, currentProfileId }: CommentsProps) => {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // isLoading,
    // isError,
  } = useInfiniteQuery({
    queryKey: ['comments', ticketId],
    queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
    initialPageParam: undefined as string | undefined, // fixes type error in getNextPageParam!!!
    initialData: {
      pages: [initialData],
      pageParams: [undefined], // primer página no tiene cursor
    },
    getNextPageParam: (lastPage) => {
      return lastPage.metadata.hasNextPage ? lastPage.metadata.nextCursor : undefined;
    },
  });

  // const handleAfterDeleteComment = () => {
  //   queryClient.invalidateQueries({ queryKey: ['comments', ticketId] })
  // }

  // const handleAfterCreateComment = () => {
  //   queryClient.invalidateQueries({ queryKey: ['comments', ticketId] })
  // }

  const refreshComments = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['comments', ticketId] })
  }, [queryClient, ticketId])

  const comments = data?.pages.flatMap(page => page.list) ?? []

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateform ticketId={ticketId} onSucessAction={refreshComments} />}
      />
      <div className="flex flex-col gap-2 ml-8">
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isFromCurrentUser={currentProfileId === comment.author?.id}
            handleDeleteComment={refreshComments}
          />
        ))}
      </div>

      {hasNextPage ? <div className="flex flex-col justify-center ml-8">
        {isFetchingNextPage ? (
          <div className="flex items-center justify-center h-[36px]">
            <LoaderCircle className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <Button variant="ghost" onClick={() => fetchNextPage()}>More</Button>
        )}
      </div> : (
        <div className="h-[36px]">
          <p className="text-right text-xs italic">No more comments.</p>
        </div>
      )}
    </>
  )
}

export default Comments;
