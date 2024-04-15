import { DailyDiet } from '@/entities/diet';

interface GymItem {
  gymId: number;
  name: string;
}

interface InviteRequest {
  name: string;
  lessonCnt: number;
}

interface InviteResponse {
  uuid: string;
  invitationLink: string;
}

interface RegisterGymRequest {
  memberType: string;
  gymId: number;
  name: string;
}

interface RegisteredStudent {
  memberId: number;
  name: string;
  nickName: null;
  userId: string;
  email: string;
  ranking: number;
  lessonCnt: number;
  remainLessonCnt: number;
  fileUrl: null;
}

interface InviteRequest {
  name: string;
  lessonCnt: number;
}

interface InviteResponse {
  uuid: string;
  invitationLink: string;
}

interface Member {
  id: number;
  userId: string;
  email: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  delYn: boolean;
  profile: {
    id: number;
    fileName: string;
    originalName: string;
    extension: string;
    fileSize: number;
    fileUrl: string;
  };
  memberType: 'STUDENT' | 'TRAINER';
  pushAlarmStatus: 'ENABLED' | 'DISABLE';
  feedbackAlarmStatus: 'ENABLED' | 'DISABLE';
  gym: {
    id: number;
    name: string;
  };
  socialType: 'NONE' | 'KAKAO' | 'NAVER' | 'GOOGLE';
}

interface StudentDetail {
  memberId: number;
  name: string;
  nickName: string | null;
  fileUrl: string | null;
  memo: string | null;
  ranking: number;
  lessonCnt: number;
  remainLessonCnt: number;
  lessonDt: string;
  lessonStartTime: string;
  diet: DailyDiet;
}

export type {
  GymItem,
  InviteRequest,
  InviteResponse,
  Member,
  RegisteredStudent,
  StudentDetail,
};
