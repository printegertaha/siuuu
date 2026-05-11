
import { PrismaClient } from "./lib/generated/prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: { name: "taha", email: "t@x.x" },
  });
  console.log(user);
}
main()
  .catch((err) => console.error(err.message))
  .finally(async () => prisma.$disconnect());
