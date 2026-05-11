// بدلاً من @prisma/client
import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: { name: "taha", email: "taha@x.x" },
  });
}
