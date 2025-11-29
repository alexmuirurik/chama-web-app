import { Prisma } from "@/src/generate/prisma/browser"


export type LoanWithMember = Prisma.LoanGetPayload<{
    include: {
        member: true
    }
}>

export type SavingWithMember = Prisma.SavingGetPayload<{
    include: {
        member: true
        deduction: true
    }
}>

export type MemberwithUser = Prisma.MemberGetPayload<{
    include: {
        user: true
    }
}>

export type Memberloan = Prisma.MemberGetPayload<{
    include: {
        loans: true
        shortLoans: true
        penalties: true
    }
}>

export type ChamawithMembers = Prisma.ChamaGetPayload<{
    include: {
        members: true
    }
}>