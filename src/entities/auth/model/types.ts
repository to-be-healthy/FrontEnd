interface SignInRequest {
  userId: string;
  password: string;
  memberType: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  memberType: 'MEMBER' | 'TRAINER';
  userId: string;
}

interface UserInfo {
  userId: string | null;
  memberType: string | null;
  refreshToken: string | null;
  accessToken: string | null;
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

export type {
  Provider,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UserInfo,
};
