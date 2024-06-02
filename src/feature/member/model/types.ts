import { SocialProvider } from '@/entity/auth';
import { DailyDiet } from '@/entity/diet';
import { Gym } from '@/entity/gym';

import { courseHistoryCodeDescription } from '../const';

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
  scheduleNoticeStatus: 'ENABLED' | 'DISABLE';
  gym: Gym;
  socialType: 'NONE' | Uppercase<SocialProvider>;
}

interface StudentDetail {
  memberId: number;
  name: string;
  nickName: string | null;
  fileUrl: string | null;
  memo: string | null;
  ranking: number;
  lessonDt: string | null;
  lessonStartTime: string | null;
  diet: DailyDiet | null;
  course: CourseItem | null;
  point: StudentPoint;
  rank: StudentRank;
  gym: Gym;
}

interface AppendMemberForm {
  name: string;
  lessonCnt: number;
}

type CourseHistory = keyof typeof courseHistoryCodeDescription;

type HistoryType = 'NO_SHOW' | 'NO_SHOW_CANCEL' | 'WORKOUT' | 'DIET';

interface CourseItem {
  courseId: number;
  totalLessonCnt: number;
  remainLessonCnt: number;
  completedLessonCnt: number;
  createdAt: string;
}

interface CourseHistoryItem {
  courseHistoryId: number;
  cnt: number;
  calculation: string;
  type: CourseHistory;
  createdAt: string;
}

interface StudentCourse {
  course: CourseItem;
  gymName: string;
  courseHistories: CourseHistoryItem[];
}

interface pointHistoryType {
  pointId: number;
  type: HistoryType;
  calculation: 'MINUS' | 'PLUS';
  point: number;
  createdAt: string;
}

interface StudentPoint {
  monthPoint: number;
  totalPoint: number;
  searchDate: string;
  pointHistories: null | pointHistoryType[];
}
interface StudentRank {
  ranking: number;
  totalMemberCnt: number;
  lastMonthRanking: number;
}

interface Diet {
  dietId: number;
  member: {
    id: number;
    userId: string;
    email: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    delYn: boolean;
    profile: null | { id: number; fileUrl: string };
    memberType: 'STUDENT' | 'TRAINER';
    pushAlarmStatus: null | 'ENABLED' | 'DISABLE';
    feedbackAlarmStatus: null | 'ENABLED' | 'DISABLE';
    gym: null | Gym;
    socialType: ['NONE', 'KAKAO', 'NAVER', 'GOOGLE'];
  };
  likeCnt: number;
  commentCnt: number;
  breakfast: {
    fast: boolean;
    dietFile: null | {
      id: number;
      dietId: number;
      fileUrl: string;
      type: string;
    };
  };
  lunch: {
    fast: boolean;
    dietFile: null | {
      id: number;
      dietId: number;
      fileUrl: string;
      type: string;
    };
  };
  dinner: {
    fast: boolean;
    dietFile: null | {
      id: number;
      dietId: number;
      fileUrl: string;
      type: string;
    };
  };
}
export type {
  AppendMemberForm,
  CourseHistoryItem,
  CourseItem,
  Diet,
  HistoryType,
  InviteForm,
  Member,
  pointHistoryType,
  RegisteredStudent,
  StudentCourse,
  StudentDetail,
  StudentPoint,
  StudentRank,
};
