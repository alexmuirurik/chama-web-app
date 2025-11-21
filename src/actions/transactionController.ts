'use server'

import prisma from '@/prisma/prisma'
import { AddFundsSchema } from '@/prisma/schemas'
import z from 'zod'
import { getDeductionByMemberId } from './deductionController'

export const addTransaction = async (data: z.infer<typeof AddFundsSchema>) => {
    try {
        const deduction = await getDeductionByMemberId(data)
        const transaction = await prisma.saving.create({
            data: {
                amount: data.amount,
                memberId: data.memberId,
                deductionId: deduction.id,
            },
        })
        return transaction
    } catch (error) {
        throw new Error(error as any)
    }
}
