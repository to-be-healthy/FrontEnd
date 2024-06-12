interface UserInfo {
  userId: string;
  accessToken: string;
  refreshToken: string;
  gymId: number | null;
  memberType: 'STUDENT' | 'TRAINER' | null;
  memberId: number | null;
  name: string | null;
}

type LowercaseMemberType = Lowercase<Exclude<'STUDENT' | 'TRAINER', null>> | undefined;

type SocialProvider = 'kakao' | 'naver' | 'google';

type SocialType = 'NONE' | Uppercase<SocialProvider>;

interface SignUpRequest {
  userId: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  memberType: string;
  uuid: string | null;
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
  LowercaseMemberType,
  SignUpFormType,
  SignUpRequest,
  SocialProvider,
  SocialType,
  Trainer,
  UserInfo,
};
