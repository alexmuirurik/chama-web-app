'use server'

import prisma from '@/prisma/prisma'
import { CreateChamaSchema } from '@/prisma/schemas/userschemas'
import z from 'zod'
import { getUserById, updateUser } from './userController'
import { Role } from '../generate/prisma/enums'

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
                members: {
                    create: [
                        {
                            name: user.name as string,
                            email: user?.email as string,
                            phoneNumber: user?.role as string,
                            role: Role.ADMIN,
                            user: {
                                connect: {
                                    id: user?.id ?? data.userId,
                                }
                            }
                        }
                    ]
                }
            },
        })

        const updateChamaId = await updateUser({
            userId: user?.id ?? data.userId,
            chamaId: chama.id,
            role: Role.ADMIN,
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
