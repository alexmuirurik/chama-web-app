'use server'

import prisma from '@/prisma/prisma'
import { UpdateUserSchema } from '@/prisma/schemas'
import z from 'zod'

export const getUserById = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })
        return user
    } catch (error) {
        throw new Error(error as any)
    }
}

export const updateUser = async (data: z.infer<typeof UpdateUserSchema>) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: data.userId,
            },
            data,
        })
        return user
    } catch (error) {
        throw new Error(error as any)
    }
}
