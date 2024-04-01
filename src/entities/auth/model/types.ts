interface SignInRequest {
  userId: string;
  password: string;
  memberType: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  memberType: 'STUDENT' | 'TRAINER';
  userId: string;
  gymId: number | null;
}

interface UserInfo {
  userId: string | null;
  memberType: string | null;
  refreshToken: string | null;
  accessToken: string | null;
  gymId: number | null;
}

type Provider = 'kakao' | 'naver' | 'google';

interface SignUpRequest {
  userId: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  memberType: string;
  trainerId: string;
}

interface SignUpResponse {
  id: number;
  email: string;
  userId: string;
  name: string;
  memberType: string;
}

interface SocialSignInRequest {
  provider: Provider;
  code: string;
  memberType: string;
  state: string;
  redirectUrl?: string;
}

interface GymList {
  gymId: number;
  name: string;
}

interface CheckVerificationCodeRequest {
  email: string;
  emailKey: string;
}

export type {
  CheckVerificationCodeRequest,
  GymList,
  Provider,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  SocialSignInRequest,
  UserInfo,
};
