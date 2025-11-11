import prisma from '@/prisma/prisma'

export const createChama = async (data: any) => {
    try {
        const chama = await prisma.chama.create({ data })
        return chama
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export const getChamas = async () => {
    try {
        const chamas = await prisma.chama.findMany()
        return chamas
    } catch (error) {
        console.log(error)
        return []
    }
}
