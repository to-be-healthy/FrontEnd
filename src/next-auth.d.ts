import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  /**
   * Leveraged by session callback's user object (AdapterUser extends User)
   */
  export interface User extends DefaultUser {
    /** Define any user-specific variables here to make them available to other code inferences */
    email?: string | null;
    id?: string;
    accessToken?: string;
    // Any other attributes you need from either your User table columns or additional fields during a session callback
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session extends DefaultSession {
    refreshTokenExpires?: number;
    accessTokenExpires?: string;
    refreshToken?: string;
    accessToken: string;
    error?: string;
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    accessToken: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
