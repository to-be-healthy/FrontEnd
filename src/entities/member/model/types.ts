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

export type {
  InviteRequest,
  InviteResponse,
  Member,
  RegisteredStudent,
  RegisteredStudentsListResponse,
  RegisterGymRequest,
};
