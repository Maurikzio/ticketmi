import { prisma } from "@/lib/prisma"

const profiles = [
  {
    userId: "5a0f2f3d-0281-4729-96fa-1f2b22d4fc4c",
    userName: "Pedro",
    userLastname: "Fernandez",
    email: "durodematar@yopmail.com",
  },
  {
    userId: "226a21fe-4ed4-45cc-80b3-c56ddf2fa32b",
    userName: "Ronaldinho",
    userLastname: "Gaucho",
    email: "dinhodabest@yopmail.com"
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
  const dbProfiles = await prisma.profile.createManyAndReturn({ data: profiles })
  await prisma.userOrganization.createMany({
    data: [
      {
        profileId: dbProfiles[0].id,
        organizationId: dbOrganization.id,
        isActive: true,
        role: "ADMIN"
      },
      {
        profileId: dbProfiles[1].id,
        organizationId: dbOrganization.id,
        role: "MEMBER"
      }
    ]
  })
  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      profileId: dbProfiles[0].id,
      organizationId: dbOrganization.id
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
