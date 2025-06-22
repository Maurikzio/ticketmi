import { prisma } from "@/lib/prisma"

const profiles = [
  {
    userId: "26e5cd3f-d57f-4f7c-9fc9-300c8ffa661f",
    userName: "Pedro",
    userLastname: "Fernandez",
  }
]

const tickets = [
  {
    // id: "1",
    title: "Ticket 1",
    content: "This is the first ticket from the database",
    status: "DONE" as const,
    deadline: "2024-12-31",
    bounty: 500,
  },
  {
    // id: "2",
    title: "Ticket 2",
    content: "This is the second ticket ticket from the database",
    status: "OPEN" as const,
    deadline: "2024-10-31",
    bounty: 100,
  },
  {
    // id: "3",
    title: "Ticket 3",
    content: "This is the third ticket ticket from the database",
    status: "IN_PROGRESS" as const,
    deadline: "2024-11-31",
    bounty: 200,
  }
];

const seed = async () => {
  const t0 = performance.now()
  await prisma.profile.deleteMany()
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
  const dbProfiles = await prisma.profile.createManyAndReturn({ data: profiles })
  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      profileId: dbProfiles[0].id
    }))
  })
  const t1 = performance.now()
  console.log(`DB Seed: Finished in (${t1 - t0}ms)`)
}

seed()
