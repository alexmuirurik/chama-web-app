'use server'

import prisma from '@/prisma/prisma'
import { CreateChamaSchema } from '@/prisma/schemas'
import z from 'zod'
import { createMember } from './memberController'
import { Role } from '@/src/generated/prisma/enums'

export const createChama = async (data: z.infer<typeof CreateChamaSchema>) => {
    try {
        const chama = await prisma.chama.create({ data })
        const member = await createMember({
            chamaId: chama.id,
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            role: Role.ADMIN,
        })
        return chama
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getChamas = async () => {
    try {
        const chamas = await prisma.chama.findMany()
        return chamas
    } catch (error: any) {
        throw new Error(error)
    }
}
