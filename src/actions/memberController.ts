'use server'

import prisma from '@/prisma/prisma'
import { CreateMemberSchema } from '@/prisma/schemas/userschemas'
import z from 'zod'

export const createMember = async (
    data: z.infer<typeof CreateMemberSchema>
) => {
    try {
        const member = await prisma.member.create({
            data,
        })
        return member
    } catch (error) {
        throw new Error(error as any)
    }
}

export const getMemberByEmail = async (email: string) => {
    try {
        const member = await prisma.member.findFirst({
            where: {
                email: email,
            },
        })
        return member
    } catch (error) {
        throw new Error(error as any)
    }
}

export const getMembers = async (chamaId: string) => {
    try {
        const members = await prisma.member.findMany({
            where: {
                chamaId: chamaId,
            },
            include: {
                user: true,
            },
        })
        return members
    } catch (error) {
        throw new Error(error as any)
    }
}
