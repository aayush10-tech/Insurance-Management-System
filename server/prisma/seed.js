import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: {
      email: "aayush@example.com",
    },
    update: {},
    create: {
      fullName: "Aayush Mahadik",
      email: "aayush@example.com",
      password: hashedPassword,
      role: "AGENT",
    },
  });

  console.log("✅ User seeded successfully!");
  console.log(user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });