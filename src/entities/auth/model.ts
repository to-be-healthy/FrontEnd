export interface SignInRequest {
  userId: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpRequest {
  userId: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  memberType: string;
  trainerId: string;
}

export interface SignUpResponse {
  id: number;
  email: string;
  userId: string;
  name: string;
  memberType: string;
}
