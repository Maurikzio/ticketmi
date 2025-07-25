import { attachmentDownloadPath } from "@/paths";
import { Attachment } from "@prisma/client"
import { ArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";

interface AttachmentItemProps {
  attachment: Attachment;
  buttons: React.ReactNode[]
}
const AttachmentItem = ({ attachment, buttons }: AttachmentItemProps) => {
  return (
    <div className="flex justify-between items-center">
      <Link
        href={attachmentDownloadPath(attachment.id)}
        className="flex gap-2 items-center text-sm truncate"
      >
        <ArrowUpRightFromSquare className="h-4 w-4" />
        {attachment.name}
      </Link>
      {buttons}
    </div>
  )
}

export default AttachmentItem
