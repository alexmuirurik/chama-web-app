import prisma from "@/prisma/prisma"
import { CreateMemberSchema } from "@/prisma/schemas"
import z from "zod"

export const createMember = async (data: z.infer<typeof CreateMemberSchema>) => {
    try {
        const member = await prisma.member.create({ data })
        return member
    } catch (error) {
        throw new Error(error as any)
    }
}

export const getMembers = async () => {
    try {
        const members = await prisma.member.findMany()
        return members
    } catch (error) {
        throw new Error(error as any)
    }
}