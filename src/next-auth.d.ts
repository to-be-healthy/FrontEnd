import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
    // role?: string; // 예정
  }

  interface Session extends DefaultSession {
    refreshToken?: string;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string;
    iat?: number;
    exp?: number;
    jti?: string;
    user?: {
      accessToken: string;
      refreshToken?: string;
      id?: string;
      userId?: string;
    };
  }
}
