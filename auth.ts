import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma/prisma'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import { getMemberByEmail } from './src/actions/memberController'

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
                session.user.id = user.id as string
                session.user.role = user.role
                session.user.chamaId = user.chamaId as string
            }

            if (!session.user.chamaId && user.chamaId) {
                session.user.chamaId = user.chamaId as string
            }

            return session
        },

        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
    },
    session: {
        strategy: 'database',
    }
})
