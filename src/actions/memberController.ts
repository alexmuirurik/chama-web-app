'use server'

import prisma from '@/prisma/prisma'
import { CreateMemberSchema } from '@/prisma/schemas/userschemas'
import z from 'zod'
import { TransactionStatus } from '../generate/prisma/enums'

export const createMember = async (
    data: z.infer<typeof CreateMemberSchema>
) => {
    try {
        const member = await prisma.member.create({
            data: { 
                ...data,
                balanceSheet: {
                    create: {}
                }
            },
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

export const getMembersWithoutActiveLoans = async (
    chamaId: string,
    loanType: 'LONG_TERM' | 'SHORT_TERM'
) => {
    try {
        if (loanType === 'LONG_TERM') {
            const members = await prisma.member.findMany({
                where: {
                    chamaId: chamaId,
                    loans: {
                        none: {
                            status: TransactionStatus.PENDING,
                        },
                    },
                },
                include: {
                    user: true,
                },
            })

            return members
        }

        const members = await prisma.member.findMany({
            where: {
                chamaId: chamaId,
                shortLoans: {
                    none: {
                        status: TransactionStatus.PENDING,
                    },
                },
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
