'use server'

import prisma from '@/prisma/prisma'
import { CreateSavingSchema } from '@/prisma/schemas/savingSchemas'
import z from 'zod'

export const getSavings = async (chamaId: string) => {
    try {
        const savings = await prisma.saving.findMany({
            where: {
                member: {
                    chamaId: chamaId,
                }
            },
            include: {
                member: true,
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
        const saving = await prisma.saving.create({
            data,
        })
        return saving
    } catch (error) {
        throw new Error(error as any)
    }
}
