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
  uuid?: string;
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

interface CheckVerificationCodeRequest {
  email: string;
  emailKey: string;
}

interface SignUpFormType {
  userId: string;
  name: string;
  password: string;
  passwordConfirm: string;
  email: string;
  emailVerifiedCode: string;
  signUp: string;
}

interface Trainer {
  id: number;
  userId: string;
  email: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  delYn: false;
  profile: null;
  memberType: 'TRAINER';
  pushAlarmStatus: 'ENABLED';
  feedbackAlarmStatus: 'ENABLED';
  gym: null | number;
  socialType: 'NONE';
}

export type {
  CheckVerificationCodeRequest,
  Provider,
  SignInRequest,
  SignInResponse,
  SignUpFormType,
  SignUpRequest,
  SignUpResponse,
  SocialSignInRequest,
  Trainer,
  UserInfo,
};
