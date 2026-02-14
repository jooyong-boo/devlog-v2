import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { authConfig } from './auth.config';

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // Fetch role information from Prisma
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          include: { role: true },
        });
        if (dbUser) {
          session.user.role = dbUser.role.name;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
