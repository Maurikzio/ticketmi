import { prisma } from "@/lib/prisma"

const profiles = [
  {
    userId: "26e5cd3f-d57f-4f7c-9fc9-300c8ffa661f",
    userName: "Pedro",
    userLastname: "Fernandez",
  },
  {
    userId: "226a21fe-4ed4-45cc-80b3-c56ddf2fa32b",
    userName: "Ronaldinho",
    userLastname: "Gaucho"
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

const comments = [
  { content: "First comment" },
  { content: "Second comment" },
  { content: "Third comment" },
]

const seed = async () => {
  const t0 = performance.now()
  await prisma.profile.deleteMany()
  await prisma.ticket.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.organization.deleteMany()
  await prisma.userOrganization.deleteMany()

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
  const dbOrganization = await prisma.organization.create({ data: { name: "Organization 1" } })
  await prisma.userOrganization.create({
    data: {
      userId: "26e5cd3f-d57f-4f7c-9fc9-300c8ffa661f",
      organizationId: dbOrganization.id
    }
  })
  const dbProfiles = await prisma.profile.createManyAndReturn({ data: profiles })
  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      profileId: dbProfiles[0].id
    }))
  })
  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      authorId: dbProfiles[1].id,
      ticketId: dbTickets[0].id
    }))
  })
  const t1 = performance.now()
  console.log(`DB Seed: Finished in (${t1 - t0}ms)`)
}

seed()
