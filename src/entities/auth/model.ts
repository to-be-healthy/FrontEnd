export interface SignInRequest {
  userId: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}
