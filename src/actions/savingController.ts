'use server'

import prisma from '@/prisma/prisma'
import { CreateSavingSchema } from '@/prisma/schemas/savingSchemas'
import z from 'zod'
import { TransactionStatus } from '../generate/prisma/enums'
import { getMemberLoansandShortLoans } from './memberController'

export const getSavings = async (chamaId: string) => {
    try {
        const savings = await prisma.saving.findMany({
            where: {
                member: {
                    chamaId: chamaId,
                },
            },
            include: {
                member: true,
                deduction: true,
            },
        })
        return savings
    } catch (error) {
        throw new Error(error as any)
    }
}

export const createSaving = async (
    data: z.infer<typeof CreateSavingSchema>
) => {
    try {
        const getMemberLoans = await getMemberLoansandShortLoans(data.memberId)
        const loan = getMemberLoans?.loans[0]
        const shortLoan = getMemberLoans?.shortLoans[0]
        const penalty = getMemberLoans?.penalties[0]
        const loanAmount = loan?.loanAmount ?? 0 - data.loanAmount
        const shortLoanAmount =
            shortLoan?.loanAmount ?? 0 - data.shortLoanAmount
        const penaltyAmount = penalty?.penaltyAmount ?? 0 - data.penaltyAmount

        const newData: any = {
            balanceSheet: {
                update: {
                    totalSavings: {
                        increment: data.amount,
                    },
                    totalLongTermLoan: {
                        decrement: data.loanAmount,
                    },
                    totalShortTermLoan: {
                        decrement: data.shortLoanAmount,
                    },
                    totalPenalties: {
                        decrement: data.penaltyAmount,
                    },
                },
            },
            savings: {
                create: {
                    amount: data.amount,
                    deduction: {
                        create: {
                            savings: data.savings,
                            welfare: data.welfare,
                            loanAmount: data.loanAmount,
                            shortLoanAmount: data.shortLoanAmount,
                            penaltyAmount: data.penaltyAmount,
                        },
                    },
                },
            },
        }



        if (data.loanId) {
            newData.loans = {
                update: {
                    where: {
                        id: data.loanId,
                    },
                    data: {
                        loanAmount: {
                            decrement: data.loanAmount,
                        },
                        status:
                            loanAmount === 0
                                ? TransactionStatus.COMPLETED
                                : TransactionStatus.PENDING,
                    },
                },
            }

            newData.savings.create.loan = {
                connect: {
                    id: data.loanId,
                },
            }
        }

        if (data.shortLoanId) {
            newData.shortLoans = {
                update: {
                    where: {
                        id: data.shortLoanId,
                    },
                    data: {
                        loanAmount: {
                            decrement: data.shortLoanAmount,
                        },
                        status:
                            shortLoanAmount === 0
                                ? TransactionStatus.COMPLETED
                                : TransactionStatus.PENDING,
                    },
                },
            }

            newData.savings.create.shortLoan = {
                connect: {
                    id: data.shortLoanId,
                },
            }
        }

        if (data.penaltyId) {
            newData.penalties = {
                update: {
                    where: {
                        id: data.penaltyId,
                    },
                    data: {
                        penaltyAmount: {
                            decrement: data.penaltyAmount,
                        },
                        status:
                            penaltyAmount === 0
                                ? TransactionStatus.COMPLETED
                                : TransactionStatus.PENDING,
                    },
                },
            }

            newData.savings.create.penalty = {
                connect: {
                    id: data.penaltyId,
                },
            }
        }

        const member = await prisma.member.update({
            where: {
                id: data.memberId,
            },
            data: newData,
        })

        return member
    } catch (error) {
        throw new Error(error as any)
    }
}
