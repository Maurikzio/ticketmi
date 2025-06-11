'use server'

import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"
import { revalidatePath } from "next/cache"
import { z } from "zod";
import { FormState } from "../definitions";
import { toCent } from "@/utils/currency";

const createTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date format invalid"),
  // deadline: z.date({ message: "Is required" }),
  bounty: z.coerce.number().gt(0, { message: "Must be greater than $0" })
})

// const createTicket = async (actionState: FormState, formData: FormData) => {
const createTicket = async (actionState: FormState, formData: FormData): Promise<FormState> => {
  const validateFields = createTicketSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    deadline: formData.get("deadline"),
    bounty: formData.get('bounty')
  })

  if (!validateFields.success) {
    return {
      message: "Missing fields. Failed to create ticket",
      errors: validateFields.error.flatten().fieldErrors,
      values: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        deadline: formData.get("deadline") as string,
        bounty: formData.get("bounty") ? Number(formData.get("bounty")) : undefined
      }
    }
  }

  const { title, content, deadline, bounty } = validateFields.data;
  const bountyInCents = toCent(bounty); //Convert to store value in cents.
  try {
    await prisma.ticket.create({
      data: { title, content, deadline, bounty: bountyInCents }
    })
    revalidatePath(ticketsPath)
    return { message: "Ticket created", status: "success", timestamp: new Date().getTime() }
  } catch (error) {
    console.error(error)
    return {
      status: "error",
      message: "Something went wrong"
    }
  }
}

export default createTicket;
