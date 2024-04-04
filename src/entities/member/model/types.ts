export interface RegisteredStudent {
  memberId: number;
  name: string;
  userId: string;
  email: string;
  ranking: number;
  lessonCnt: number;
  remainLessonCnt: number;
  gymEndDt: string;
}

export type RegisteredStudentsListResponse = RegisteredStudent[] | null;
