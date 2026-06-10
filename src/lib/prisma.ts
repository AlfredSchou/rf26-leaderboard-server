import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.HIGHSCORES_PRISMA_DATABASE_URL });
const prisma: InstanceType<typeof PrismaClient> = new PrismaClient({ adapter });
export default prisma;