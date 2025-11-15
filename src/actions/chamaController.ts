'use server'

import prisma from '@/prisma/prisma'
import { CreateChamaSchema } from '@/prisma/schemas'
import z from 'zod'
import { createMember } from './memberController'
import { Role } from '@/src/generated/prisma/enums'
import { getUserById, updateUser } from './userController'

export const createChama = async (data: z.infer<typeof CreateChamaSchema>) => {
    try {
        const user = await getUserById(data.userId)
        if (!user) {
            throw new Error('User not found')
        }
        const chama = await prisma.chama.create({
            data: {
                name: data.name,
                location: data.location,
                minimumSavings: data.minimumSavings,
                adminId: data.userId,
            },
        })
        const member = await createMember({
            chamaId: chama.id,
            name: user.name as string,
            email: user?.email as string,
            phoneNumber: user?.role as string,
            userId: user?.id ?? data.userId,
            role: Role.ADMIN,
        })

        const updateChamaId = await updateUser({
            userId: user?.id ?? data.userId,
            chamaId: chama.id,
            role: user?.role ?? Role.ADMIN,
        })

        return chama
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getChamaById = async (chamaId: string) => {
    try {
        const chama = await prisma.chama.findUnique({
            where: {
                id: chamaId,
            },
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
