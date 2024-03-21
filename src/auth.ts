import NextAuth, { NextAuthConfig, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { requestSignIn } from './entities/auth/api';

export const config = {
  pages: {
    signIn: '/signin',
    newUser: '/signup',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {},
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { statusCode, data } = await requestSignIn({
          userId: credentials.username as string,
          password: credentials.password as string,
        });
        const user = data as User;

        console.log(user);
        if (statusCode === 'OK') {
          return {
            email: user.email,
            name: user.name,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    /**
     * JWT Callback
     * 웹 토큰이 실행 혹은 업데이트될때마다 콜백이 실행
     * 반환된 값은 암호화되어 쿠키에 저장됨
     * 초기 로그인시 User 정보를 가공해 반환
     */
    jwt: ({ token, user }) => {
      return { ...token, ...user };
    },
    /**
     * Session Callback
     * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
     * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
     * JWT 토큰의 정보를 Session에 유지 시킨다.
     */
    session: ({ session, token }) => {
      session.user = token;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
