'use server'

import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const updateTicket = async (ticketId: string, actionState: { message?: string }, formData: FormData) => {
  const data = {
    title: formData.get("title"),
    content: formData.get("content")
  }
  await prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      title: data.title as string,
      content: data.content as string,
    }
  })

  revalidatePath(ticketsPath)
  redirect(ticketsPath)

}

export default updateTicket;
