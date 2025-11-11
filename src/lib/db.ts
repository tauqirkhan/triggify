import { PrismaClient } from "@/generated/prisma/client";

// global is uneffected by Next.js hot reload
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({log: ['query', 'error', 'warn']})

if(process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma

export default prisma