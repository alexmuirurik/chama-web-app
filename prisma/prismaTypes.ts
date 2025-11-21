import { Prisma } from "@/src/generate/prisma/client"

export type MemberwithUser = Prisma.MemberGetPayload<{
    include: {
        user: true
    }
}>

export type ChamawithMembers = Prisma.ChamaGetPayload<{
    include: {
        members: true
    }
}>

export type DeductionWithMember = Prisma.DeductionGetPayload<{
    include: {
        member: true
    }
}> 

export type SavingWithMember = Prisma.SavingGetPayload<{
    include: {
        member: true
    }
}>