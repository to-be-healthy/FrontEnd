import { SocialType } from '@/entity/auth';
import { HomeDietData } from '@/entity/diet';
import { Gym } from '@/entity/gym';
import { courseHistoryTypes } from '@/feature/course';
import { Pageable } from '@/shared/api';

interface RegisteredStudent {
  memberId: number;
  name: string;
  nickName: null;
  userId: string;
  email: string;
  ranking: number;
  lessonCnt: number;
  remainLessonCnt: number;
  fileUrl: string | null;
  nonmember: boolean;
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
  communityAlarmStatus: 'ENABLED' | 'DISABLE';
  gym: Gym;
  socialType: SocialType;
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
  diet: HomeDietData;
  course: CourseItem | null;
  point: StudentPointItem | null;
  rank: StudentRank;
  gym: Gym;
}

interface AppendMemberForm {
  name: string;
  lessonCnt: number;
}

type CourseHistory = keyof typeof courseHistoryTypes;

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

interface StudentCourse extends Pageable {
  mainData: {
    course: CourseItem;
    gymName: string;
  };
  content: CourseHistoryItem[] | null;
}

interface pointHistoryType {
  pointId: number;
  type: HistoryType;
  calculation: 'MINUS' | 'PLUS';
  point: number;
  createdAt: string;
}

interface StudentPointItem {
  monthPoint: number;
  totalPoint: number;
  searchDate: string;
}

interface StudentPoint extends Pageable {
  mainData: StudentPointItem;
  content: pointHistoryType[] | null;
}

interface StudentRank {
  ranking: number;
  totalMemberCnt: number;
  lastMonthRanking: number;
}

interface FindIdRequest {
  name: string;
  email: string;
}

type FindPasswordRequest = FindIdRequest;

interface FindIdResponse {
  userId: string;
  createdAt: Date;
  socialType: SocialType;
}

type FindPasswordResponse = Pick<FindIdResponse, 'socialType'>;

export type {
  AppendMemberForm,
  CourseHistoryItem,
  CourseItem,
  FindIdRequest,
  FindIdResponse,
  FindPasswordRequest,
  FindPasswordResponse,
  HistoryType,
  InviteForm,
  Member,
  pointHistoryType,
  RegisteredStudent,
  StudentCourse,
  StudentDetail,
  StudentPoint,
  StudentPointItem,
  StudentRank,
};
