import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { authConfig } from './auth.config';
import { prisma } from '@/shared/lib/prisma';

const adapter = PrismaAdapter(prisma);

// Override createUser to auto-set nickname and profile from OAuth data
const originalCreateUser = adapter.createUser!;
adapter.createUser = async (data) => {
  const user = await originalCreateUser({
    ...data,
    nickname: data.name || data.email?.split('@')[0] || `user-${Date.now()}`,
    profile: data.image || '',
  } as Parameters<typeof originalCreateUser>[0]);
  return user;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      const userId =
        (user?.id as string | undefined) ??
        (token.id as string | undefined) ??
        token.sub;

      if (userId) {
        token.id = userId;
      }

      if (userId && (!token.role || user)) {
        const dbUser = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            role: {
              select: { name: true },
            },
          },
        });
        token.role = dbUser?.role.name ?? 'user';
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const userId = (token.id as string | undefined) ?? token.sub;
        if (userId) {
          session.user.id = userId;
        }
        session.user.role = (token.role as string) ?? 'user';
      }
      return session;
    },
  },
});
