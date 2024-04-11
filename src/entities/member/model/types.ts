interface RegisterGymRequest {
  memberType: string;
  gymId: number;
  joinCode?: number;
}

interface RegisteredStudent {
  memberId: number;
  name: string;
  userId: string;
  email: string;
  ranking: number;
  lessonCnt: number;
  remainLessonCnt: number;
  gymEndDt: string;
}

interface InviteRequest {
  name: string;
  lessonCnt: number;
}

interface InviteResponse {
  uuid: string;
  invitationLink: string;
}

type RegisteredStudentsListResponse = RegisteredStudent[] | null;

export type {
  InviteRequest,
  InviteResponse,
  RegisteredStudent,
  RegisteredStudentsListResponse,
  RegisterGymRequest,
};
