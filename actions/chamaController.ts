'use server'

import prisma from '@/prisma/prisma'
import { CreateChamaSchema } from '@/prisma/schemas'
import z from 'zod'
import { createMember } from './memberController'
import { Role } from '@/src/generated/prisma/enums'
import { getUserById } from './userController'

export const createChama = async (data: z.infer<typeof CreateChamaSchema>) => {
    try {
        const user = await getUserById(data.userId)
        const chama = await prisma.chama.create({
            data: {
                name: data.name,
                location: data.location,
                minimumSavings: data.minimumSavings,
                adminId: data.userId
            },
        })
        const member = await createMember({
            chamaId: chama.id,
            name: data.name,
            email: user?.email ?? '',
            phoneNumber: user?.role ?? '',
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
