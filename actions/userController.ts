import prisma from '@/prisma/prisma'

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
