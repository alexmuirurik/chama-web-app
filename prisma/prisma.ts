import { PrismaClient } from "@/src/app/generate/prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'


const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient({
    accelerateUrl: process.env.POSTGRES_URL as string
}).$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
