interface UserInfo {
  userId: string;
  accessToken: string;
  refreshToken: string;
  gymId: number | null;
  memberType: 'STUDENT' | 'TRAINER' | null;
  memberId: number | null;
  name: string | null;
}

type SocialProvider = 'kakao' | 'naver' | 'google';

interface SignUpRequest {
  userId: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  memberType: string;
  uuid?: string;
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

export type { SignUpFormType, SignUpRequest, SocialProvider, Trainer, UserInfo };
