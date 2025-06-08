'use server'

import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"
import { revalidatePath } from "next/cache"
import { z } from "zod";
import { FormState } from "../definitions";

const createTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024)
})

const createTicket = async (actionState: FormState, formData: FormData) => {
  const validateFields = createTicketSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content")
  })

  if (!validateFields.success) {
    return {
      message: "Missing fields. Failed to create ticket",
      errors: validateFields.error.flatten().fieldErrors
    }
  }

  const { title, content } = validateFields.data;
  try {
    await prisma.ticket.create({
      data: { title, content }
    })
    revalidatePath(ticketsPath)
    return { message: "Ticket created" }
  } catch (error) {
    console.error(error)
    return {
      message: "Something went wrong"
    }
  }
}

export default createTicket;
