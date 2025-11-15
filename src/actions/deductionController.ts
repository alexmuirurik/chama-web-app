'use server'

import prisma from '@/prisma/prisma'

export const getDeductionByMemberId = async (memberId: string) => {
    try {
        const deduction = await prisma.deduction.findFirst({
            where: {
                memberId: memberId,
            },
        })
        if (!deduction) {
            const newDeduction = await prisma.deduction.create({
                data: {
                    memberId: memberId,
                    memberMonth: new Date().toLocaleDateString('default', {
                        month: 'long',
                    }),
                    longTermLoanRepayment: 0,
                    shortTermLoanRepayment: 0,
                    penaltiesRepayment: 0,
                    interest: 0,
                },
            })
            return newDeduction
        }

        return deduction
    } catch (error) {
        throw new Error(error as any)
    }
}

export const getDeductions = async (chamaId: string) => {
    try {
        const deductions = await prisma.deduction.findMany({
            where: {
                member: {
                    chamaId: chamaId,
                },
            },
            include: {
                member: true,
            },
        })
        return deductions
    } catch (error) {
        throw new Error(error as any)
    }
}
