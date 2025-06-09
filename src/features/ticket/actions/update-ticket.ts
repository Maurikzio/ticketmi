'use server'

import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"
import { revalidatePath } from "next/cache"
// import { redirect } from "next/navigation"
import { z } from "zod";
import { FormState } from "../definitions"

const updateTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024)
})

const updateTicket = async (
  ticketId: string,
  actionState: FormState,
  formData: FormData
): Promise<FormState> => {
  const validateFields = updateTicketSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content")
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      values: {
        title: formData.get("title") as string,
        content: formData.get("content") as string
      }
    }
  }

  const { title, content } = validateFields.data;
  try {
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { title, content, }
    })
  } catch (error) {
    console.error(error)
    return {
      message: "Something went wrong",
      status: "error",
      values: { title, content }
    }
  }

  revalidatePath(ticketsPath)
  return {
    message: "Ticket updated successfully!",
    status: "success"
  }
  // redirect(ticketsPath) // keep this commented for now to allow toast to show
}

export default updateTicket;
