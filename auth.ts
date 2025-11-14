import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma/prisma'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, Github],
    callbacks: {
        async signIn({ user }) {
            return true
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role
                session.user.chamaId = token.chamaId as string
            }

            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.chamaId = user.chamaId
            }

            return token
        },
    },
    session: {
        strategy: 'jwt',
    },
})
