'use server'

import prisma from '@/prisma/prisma'
import { LoanSchema } from '@/prisma/schemas/loanSchemas'
import z from 'zod'

export const requestLoan = async (data: z.infer<typeof LoanSchema>) => {
    try {
        const { loanType, ...loanData } = data
        if (data.loanType === 'LONG_TERM') {
            const loan = await prisma.loan.create({
                data: loanData,
            })
            
            return loan
        }

        const shortLoan = await prisma.shortLoan.create({
            data: loanData,
        })

        return shortLoan
    } catch (error) {
        throw new Error(error as any)
    }
}

export const getLoans = async (chamaId: string) => {
    try {
        const loans = await prisma.loan.findMany({
            where: {
                member: {
                    chamaId: chamaId,
                },
            },
            include: {
                member: true,
            },
        })

        return loans
    } catch (error) {
        throw new Error(error as any)
    }
}
