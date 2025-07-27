import { s3 } from "@/lib/aws";
import { inngest } from "@/lib/inngest";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { generateS3Key } from "../utils/generate-s3-key";
import { AttachmentEntity } from "@prisma/client";

export type AttachmentDeletedEventArgs = {
  data: {
    attachmentId: string;
    entityId: string;
    entity: AttachmentEntity;
    fileName: string;
    organizationId: string;
  }
}

export const attachmentDeletedEvent = inngest.createFunction(
  { id: 'app/attachment.deleted' },
  { event: "app/attachment.deleted" },
  async ({ event }) => {
    const { attachmentId, entityId, entity, fileName, organizationId } = event.data;

    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: generateS3Key({ entityId, entity, organizationId, fileName, attachmentId }),
        })
      )
    } catch (error) {
      console.log(error)
      return { event, body: false }
    }

    return { event, body: true }
  }
)
