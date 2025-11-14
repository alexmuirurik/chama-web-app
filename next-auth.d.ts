import { Role } from '@prisma/client'
import 'next-auth'

declare module 'next-auth' {
    interface User {
        id?: string
        role?: Role
        companyId?: string
    }

    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            image?: string
            role?: Role
            chamaId?: string
        }
    }

    interface JWT {
        id: string
        role?: Role
        companyId?: string
    }
}
