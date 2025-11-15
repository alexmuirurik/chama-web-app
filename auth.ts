import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma/prisma'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import { Role } from './src/generated/prisma/enums'
import { getMemberByEmail } from './actions/memberController'

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, Github],
    callbacks: {
        async signIn({ user }) {
            const member = await getMemberByEmail(user.email as string)
            if (member) {
                user.role = member.role
                user.chamaId = member.chamaId
            }

            return true
        },

        async session({ session, token, user }) {
            if (session.user) {
                session.user.id = token.sub as string
                session.user.role = token.role
                session.user.chamaId = token.chamaId as string
            }

            if (!session.user.chamaId && user.chamaId) {
                session.user.chamaId = user.chamaId as string
            }

            return session
        },
    },
    session: {
        strategy: 'jwt',
    },
})
