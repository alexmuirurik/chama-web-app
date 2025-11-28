'use server'

import prisma from '@/prisma/prisma'
import { AddFundsSchema } from '@/prisma/schemas/userschemas'
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
                saving: {
                    memberId: data.memberId,
                }
            },
        })
    

        return deduction
    } catch (error) {
        throw new Error(error as any)
    }
}

export const getDeductions = async (chamaId: string) => {
    try {
        const deductions = await prisma.deduction.findMany({
            where: {
                saving:{
                    member:{
                        chamaId: chamaId
                    }
                }
            },
            include: {
                saving: {
                    include: {
                        member: true,
                    }
                }
            },
        })
        return deductions
    } catch (error) {
        throw new Error(error as any)
    }
}
