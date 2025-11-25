import { Prisma } from "@/src/generate/prisma/browser"


export type LoanWithMember = Prisma.LoanGetPayload<{
    include: {
        member: true
    }
}>

export type SavingWithMember = Prisma.SavingGetPayload<{
    include: {
        member: true
    }
}>

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