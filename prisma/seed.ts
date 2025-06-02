import { prisma } from "@/lib/prisma"

const tickets = [
  {
    // id: "1",
    title: "Ticket 1",
    content: "This is the first ticket from the database",
    status: "DONE" as const
  },
  {
    // id: "2",
    title: "Ticket 2",
    content: "This is the second ticket ticket from the database",
    status: "OPEN" as const
  },
  {
    // id: "3",
    title: "Ticket 3",
    content: "This is the third ticket ticket from the database",
    status: "IN_PROGRESS" as const
  }
];

const seed = async () => {
  const t0 = performance.now()
  await prisma.ticket.deleteMany()

  //1
  // for (const ticket of tickets) {
  //   await prisma.ticket.create({
  //     data: ticket
  //   })
  // }

  //2
  // const promises = tickets.map(ticket => prisma.ticket.create({ data: ticket }))
  // await Promise.all(promises)

  //3
  await prisma.ticket.createMany({ data: tickets })
  const t1 = performance.now()
  console.log(`DB Seed: Finished in (${t1 - t0}ms)`)
}

seed()
