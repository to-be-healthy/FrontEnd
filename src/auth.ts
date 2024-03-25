import NextAuth, { NextAuthConfig, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { requestSignIn } from '@/entities/auth/api';

export const config = {
  pages: {
    signIn: '/signin',
    newUser: '/signup',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { status, data } = await requestSignIn({
          userId: credentials.username as string,
          password: credentials.password as string,
        });
        const user = data as User;

        if (status === 200) {
          return {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            userId: user.userId,
            // role: user.role // 추가 예정
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    session: ({ session, token }) => {
      return { ...session, ...token };
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
