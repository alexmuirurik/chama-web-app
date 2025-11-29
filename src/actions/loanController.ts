'use server'

import prisma from '@/prisma/prisma'
import { LoanSchema } from '@/prisma/schemas/loanSchemas'
import z from 'zod'

export const requestLoan = async (data: z.infer<typeof LoanSchema>) => {
    try {
        if (data.loanType === 'LONG_TERM') {
            const member = await prisma.member.update({
                where: {
                    id: data.memberId,
                },
                data: {
                    loans: {
                        create: {
                            principle: data.principle,
                            loanAmount: data.loanAmount,
                            interest: data.interest,
                            termMonths: data.termMonths,
                            monthlyRepayment: data.monthlyRepayment,
                            guarantors: data.guarantors,
                        },
                    },
                    balanceSheet: {
                        update: {
                            totalLongTermLoan: {
                                increment: data.loanAmount,
                            },
                        },
                    },
                },
            })

            return member
        }

        const member = await prisma.member.update({
            where: {
                id: data.memberId,
            },
            data: {
                shortLoans: {
                    create: {
                        principle: data.principle,
                        loanAmount: data.loanAmount,
                        interest: data.interest,
                        guarantors: data.guarantors,
                    },
                },
                balanceSheet: {
                    update: {
                        totalShortTermLoan: {
                            increment: data.loanAmount,
                        },
                    },
                }
            },
        })

        return member
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
