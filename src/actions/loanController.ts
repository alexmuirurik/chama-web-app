'use server'

import prisma from "@/prisma/prisma"

export const getLoans = async (chamaId: string) => {
    try {
        const loans = await prisma.loan.findMany({
            where: {
                member: {
                    chamaId: chamaId
                }
            },
            include: {
                member: true
            }
        })

        return loans
    } catch (error) {
        throw new Error(error as any)
    }
}