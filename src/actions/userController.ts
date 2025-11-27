'use server'

import prisma from '@/prisma/prisma'
import { UpdateUserSchema } from '@/prisma/userschemas'
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
        const {userId, ...newData} = data
        const user = await prisma.user.update({
            where: {
                id: data.userId,
            },
            data: newData,
        })
        return user
    } catch (error) {
        throw new Error(error as any)
    }
}
