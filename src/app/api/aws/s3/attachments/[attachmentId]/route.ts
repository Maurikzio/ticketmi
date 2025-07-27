import { requireAuth } from "@/features/auth/utils/require-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/aws";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { generateS3Key } from "@/features/attachments/utils/generate-s3-key";
import { AttachmentEntity } from "@prisma/client";

type TicketAttachmentData = {
  id: string;
  name: string;
  ticket: {
    id: string;
    organizationId: string
  }
}

type CommentAttachmentData = {
  id: string;
  name: string;
  comment: {
    id: string;
    ticket: {
      id: string;
      organizationId: string;
    }
  }
}

const getTicketAttachmentData = async (attachmentId: string): Promise<TicketAttachmentData | null> => {
  return await prisma.attachment.findUnique({
    where: { id: attachmentId },
    select: {
      id: true,
      name: true,
      ticket: {
        select: {
          id: true,
          organizationId: true
        }
      }
    }
  }) as TicketAttachmentData | null;
}

const getCommentAttachmentData = async (attachmentId: string): Promise<CommentAttachmentData | null> => {
  return await prisma.attachment.findUnique({
    where: { id: attachmentId },
    select: {
      id: true,
      name: true,
      comment: {
        select: {
          id: true,
          ticket: {
            select: {
              id: true,
              organizationId: true,
            }
          }
        }
      }
    }
  }) as CommentAttachmentData | null
}

const generatePresignedUrl = async (attachmentData: TicketAttachmentData | CommentAttachmentData, entity: AttachmentEntity): Promise<string> => {
  let organizationId: string;
  let entityId: string;

  if ('ticket' in attachmentData) {
    organizationId = attachmentData.ticket.organizationId
    entityId = attachmentData.ticket.id
  } else {
    organizationId = attachmentData.comment.ticket.organizationId
    entityId = attachmentData.comment.id
  }

  return await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: generateS3Key({
        organizationId,
        entityId,
        entity,
        fileName: attachmentData.name,
        attachmentId: attachmentData.id
      })
    }),
    { expiresIn: 5 * 60 }
  )
}

const creatDownloadResponse = async (presignedUrl: string, fileName: string): Promise<Response> => {
  try {
    const response = await fetch(presignedUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch file from S3: ${response.statusText}`)
    }

    //headers para forzar la descarga
    const headers = new Headers()
    headers.append(
      "content-disposition",
      `attachment; filename="${fileName}"`
    )

    // Preservar el content-type original si esta disponible
    const contentType = response.headers.get('content-type')
    if (contentType) {
      headers.append('content-type', contentType)
    }

    return new Response(response.body, { headers })
  } catch (error) {
    console.error(`Error creating download response`, error)
    return new Response(
      JSON.stringify({ error: 'Failed to download file' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ attachmentId: string }> }
) {
  await requireAuth()

  try {
    const { attachmentId } = await params

    const attachmentType = await prisma.attachment.findUnique({
      where: { id: attachmentId },
      select: { entity: true }
    })

    if (!attachmentType) {
      return new Response(
        JSON.stringify({ error: "Attachment not found" }),
        { status: 404, headers: { 'content-type': 'application/json' } }
      )
    }

    let attachmentData;

    switch (attachmentType.entity) {
      case AttachmentEntity.TICKET:
        attachmentData = await getTicketAttachmentData(attachmentId)
        break
      case AttachmentEntity.COMMENT:
        attachmentData = await getCommentAttachmentData(attachmentId)
        break
      default:
        return new Response(
          JSON.stringify({ error: "Invalid attachment type" }),
          { status: 404, headers: { 'content-type': 'application/json' } }
        )
    }

    if (!attachmentData) {
      return new Response(
        JSON.stringify({ error: "Attachment data not found" }),
        { status: 404, headers: { 'content-type': 'application/json' } }
      )
    }

    //Generar URL firmada
    const presignedUrl = await generatePresignedUrl(attachmentData, attachmentType.entity);

    //Crar y retornar la respuesta de descarga
    return await creatDownloadResponse(presignedUrl, attachmentData.name)

  } catch (error) {
    console.error('Error in attachment download: ', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}
