import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from './prisma/prisma'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google, Github],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }

            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role
            }

            return session
        },
        
        async signIn({ user }) {
            return true
        },
    },
    session: {
        strategy: 'jwt',
    },
})
