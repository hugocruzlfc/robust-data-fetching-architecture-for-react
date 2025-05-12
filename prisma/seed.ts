import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function main() {
  const teamA = await prisma.team.create({
    data: {
      name: "Team A",
      description: "Equipo para proyectos de desarrollo web",
    },
  });

  const teamB = await prisma.team.create({
    data: {
      name: "Team B",
      description: "Equipo para proyectos de desarrollo movil",
    },
  });

  const userData = [
    { name: "Alice", email: "alice@prisma.io", teamId: teamA.id },
    { name: "Bob", email: "bob@prisma.io", teamId: teamB.id },
    { name: "Pere", email: "pere@prisma.io", teamId: teamA.id },
    { name: "Ral", email: "ral@prisma.io", teamId: teamB.id },
    { name: "Charlie", email: "charlie@prisma.io", teamId: teamA.id },
    { name: "Trent", email: "trent@prisma.io", teamId: teamB.id },
  ];

  for (const user of userData) {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        team: { connect: { id: user.teamId } },
      },
    });
  }

  console.log("Seed completa ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
