import NextAuth, { NextAuthConfig, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import Google from 'next-auth/providers/google';
// import Kakao from 'next-auth/providers/kakao';
// import Naver from 'next-auth/providers/naver';

interface BaseResponse<T> {
  statusCode: string;
  message: string;
  data: T;
}

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
        // (임시) Mock API
        const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/login`, {
          method: 'POST',
          body: JSON.stringify({
            userId: credentials.username,
            password: credentials.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const { data } = (await res.json()) as BaseResponse<User>;
        if (res.ok && res.status === 200) {
          return {
            email: data.email,
            name: data.name,
            // accessToken: data.accessToken,
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
    // jwt: ({ token, user }) => {
    //   console.log(token, user, 'fjdsklfjdsklfjdskljfkdlsjfklsdjfklds');
    //   return { ...token, user };
    // },
    /**
     * Session Callback
     * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
     * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
     * JWT 토큰의 정보를 Session에 유지 시킨다.
     */
    // session: ({ session, token }) => {
    //   session.user = token;
    //   return session;
    // },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
