import { ImageFile } from '@/feature/log-class';
import { TodaySchedule } from '@/feature/schedule';

interface BestStudent {
  memberId: number;
  name: string;
  userId: string;
  email: string;
  ranking: number;
  lessonCnt: number;
  remainLessonCnt: number;
  nickName: string | null;
  fileUrl: ImageFile | null;
  courseId: number;
}

interface TrainerHomeInfo {
  studentCount: number;
  bestStudents: BestStudent[] | null;
  todaySchedule: TodaySchedule;
}

export type { BestStudent, TrainerHomeInfo };
