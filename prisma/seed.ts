import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.game.createMany({
    data: [
      {
        title: "Math Tug of War",
        slug: "math-tug-of-war",
        description:
          "A fun math game where you solve equations to pull the rope your way!",
        thumbnailUrl: "/games/math-tug-of-war/thumbnail.png",
        gameUrl: "/games/math-tug-of-war/index.html",
        status: "PUBLISHED",
      },
      {
        title: "Space Invaders Classic",
        slug: "space-invaders-classic",
        description:
          "Defend Earth from alien invaders in this classic arcade shooter.",
        thumbnailUrl: "/games/space-invaders/thumbnail.png",
        gameUrl: "/games/space-invaders/index.html",
        status: "PUBLISHED",
      },
      {
        title: "Puzzle World",
        slug: "puzzle-world",
        description:
          "A challenging puzzle game coming soon. Test your problem-solving skills!",
        thumbnailUrl: "/games/puzzle-world/thumbnail.png",
        gameUrl: "/games/puzzle-world/index.html",
        status: "DRAFT",
      },
    ],
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
