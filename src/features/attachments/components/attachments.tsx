import CardCompact from "@/components/card-compact";
// import AttachmentCreateForm from "./attachment-create-form";
import { getAttachments } from "../queries/get-attachments";
import { AttachmentEntity } from "@prisma/client";
import AttachmentList from "./attachment-list";

interface AttachmentsProps {
  entityId: string;
  isOwner: boolean;
  entity: AttachmentEntity
}

const Attachments = async ({ entityId, isOwner, entity }: AttachmentsProps) => {
  const attachments = await getAttachments(entityId, entity);
  return (
    <CardCompact
      title="Attachments"
      description="Attached images or PDF's"
      content={
        <>
          <AttachmentList attachments={attachments} isOwner={isOwner} />
          {/* <div className="mx-2 flex flex-col gap-y-2 mb-4">
            {attachments.map(attachment => (
              <AttachmentItem
                key={attachment.id}
                attachment={attachment}
                buttons={[
                  ...(
                    isOwner
                      ? [<AttachmentDeleteButton key={attachment.id} id={attachment.id} />]
                      : []
                  )
                ]}
              />
            ))}
          </div> */}
          {isOwner ? <p>Service unavailble </p> : null}
          {/* {isOwner ? <AttachmentCreateForm entityId={entityId} entity={entity} /> : null} */}
        </>
      }
    />
  )
}


export default Attachments;
