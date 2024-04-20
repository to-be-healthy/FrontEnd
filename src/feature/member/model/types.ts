import { DailyDiet } from '@/entity/diet';
import { Gym } from '@/entity/gym';

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

interface InviteForm {
  name: string;
  lessonCnt: number;
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
  gym: Gym;
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

interface AppendMemberForm {
  name: string;
  lessonCnt: number;
}

export type { AppendMemberForm, InviteForm, Member, RegisteredStudent, StudentDetail };
