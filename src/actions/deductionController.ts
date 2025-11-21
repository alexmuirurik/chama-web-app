'use server'

import prisma from '@/prisma/prisma'
import { AddFundsSchema } from '@/prisma/schemas'
import z from 'zod'

export const getDeductionByMemberId = async (
    data: z.infer<typeof AddFundsSchema>
) => {
    try {
        const savings =
            data.amount -
            data.loanAmount -
            data.ngumbatoAmount -
            data.penaltiesAmount -
            data.interestAmount
        const deduction = await prisma.deduction.findFirst({
            where: {
                memberId: data.memberId,
            },
        })
        if (!deduction) {
            const newDeduction = await prisma.deduction.create({
                data: {
                    memberId: data.memberId,
                },
            })
            return newDeduction
        }

        const newDeduction = await prisma.deduction.update({
            where: {
                id: deduction.id,
            },
            data: {
            },
        })

        return newDeduction
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
