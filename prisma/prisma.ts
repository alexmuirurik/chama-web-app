export const runtime = 'nodejs'

import { PrismaClient } from "@/src/generate/prisma/client"

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma || new PrismaClient({
    accelerateUrl: process.env.PRISMA_DATABASE_URL as string
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
