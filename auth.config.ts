import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === 'admin';
      const { pathname } = nextUrl;

      // guest only 라우트: 로그인 상태면 홈으로 리다이렉트
      if (pathname.startsWith('/auth/signin')) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/', nextUrl));
        }
        return true;
      }

      // API admin 라우트: JSON 응답으로 차단
      if (pathname.startsWith('/api/admin')) {
        if (!isLoggedIn) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        if (!isAdmin) {
          return Response.json({ error: 'Forbidden' }, { status: 403 });
        }
        return true;
      }

      // admin 페이지 라우트
      if (pathname.startsWith('/admin')) {
        if (!isLoggedIn) return false; // 로그인 페이지로 리다이렉트
        if (!isAdmin) {
          return Response.redirect(new URL('/', nextUrl));
        }
        return true;
      }

      // 나머지는 모두 public
      return true;
    },
  },
} satisfies NextAuthConfig;
