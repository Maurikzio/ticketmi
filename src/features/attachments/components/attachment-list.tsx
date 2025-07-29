import { Attachment } from "@prisma/client";
import AttachmentDeleteButton from "./attachment-delete-button";
import AttachmentItem from "./attachment-item";


interface AttachmentListProps {
  attachments: Attachment[];
  isOwner: boolean
  refreshComments?: () => void
}

const AttachmentList = ({ attachments, isOwner, refreshComments }: AttachmentListProps) => {
  return (
    <div className="mx-2 flex flex-col gap-y-2 mb-4">
      {attachments.map(attachment => (
        <AttachmentItem
          key={attachment.id}
          attachment={attachment}
          buttons={[
            ...(
              isOwner
                ? [<AttachmentDeleteButton key={attachment.id} id={attachment.id} onSuccess={refreshComments} />]
                : []
            )
          ]}
        />
      ))}
    </div>
  )
}

export default AttachmentList;
