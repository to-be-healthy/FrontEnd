export interface SignInRequest {
  userId: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
