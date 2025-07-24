import { requireAuth } from "@/features/auth/utils/require-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/aws";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { generateS3Key } from "@/features/attachments/utils/generate-s3-key";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ attachmentId: string }> }
) {
  await requireAuth()

  const { attachmentId } = await params

  const attachment = await prisma.attachment.findUniqueOrThrow({
    where: {
      id: attachmentId,
    },
    include: {
      ticket: true
    }
  })

  //Create presigned URL
  const presignedUrl = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: generateS3Key({
        organizationId: attachment.ticket.organizationId,
        ticketId: attachment.ticketId,
        fileName: attachment.name,
        attachmentId: attachment.id
      })
    }),
    { expiresIn: 5 * 60 } // Expires in 5 minutes
  )

  const response = await fetch(presignedUrl);

  //Headers to tell the user the file will be downloaded by the browser instead of openning in the browser
  const headers = new Headers()
  headers.append(
    "content-disposition",
    `attachment; filename="${attachment.name}"`
  )

  return new Response(response.body, { headers })
}
