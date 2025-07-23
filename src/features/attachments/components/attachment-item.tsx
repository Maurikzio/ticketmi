import { Attachment } from "@prisma/client"

interface AttachmentItemProps {
  attachment: Attachment
}
const AttachmentItem = ({ attachment }: AttachmentItemProps) => {
  return (
    <p className="text-sm">{attachment.name}</p>
  )
}

export default AttachmentItem
