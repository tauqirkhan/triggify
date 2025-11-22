import { PrismaClient } from "@/generated/prisma/client";
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

// pool and ada
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)

// global is uneffected by Next.js hot reload
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter, log: ['query', 'error', 'warn']})

if(process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma

export default prisma