import CardCompact from "@/components/card-compact";
import AttachmentCreateForm from "./attachment-create-form";

interface AttachmentsProps {
  ticketId: string;
  isOwner: boolean;
}

const Attachments = ({ ticketId, isOwner }: AttachmentsProps) => {

  return (
    <CardCompact
      title="Attachments"
      description="Attached images or PDF's"
      content={
        <>
          {/* List of attachments */}
          {isOwner ? <AttachmentCreateForm ticketId={ticketId} /> : null}
        </>
      }
    />
  )
}


export default Attachments;
