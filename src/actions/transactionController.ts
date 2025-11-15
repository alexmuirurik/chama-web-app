'use server'

import prisma from "@/prisma/prisma"

export const addTransaction = async (data: any) => {
    try {
        const transaction = await prisma.transaction.create({
            data,
        })
        return transaction
    } catch (error) {
        throw new Error(error as any)
    }
}