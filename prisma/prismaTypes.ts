import { Prisma } from "@/src/generated/prisma/client"

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
