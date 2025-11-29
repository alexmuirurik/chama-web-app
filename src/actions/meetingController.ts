import prisma from "@/prisma/prisma"

export const getMeetings = async (chamaId: string) => {
    try{
        const meetings = await prisma.meeting.findMany()
        return meetings
    } catch (error) {
        throw new Error(error as any)
    }
}