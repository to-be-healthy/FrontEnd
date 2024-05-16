import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { Gym } from '@/entity/gym';
import { BaseError, BaseResponse } from '@/shared/api';

import { CourseItem, StudentPoint } from '../model/types';

interface HomeDataResponse {
  course: CourseItem;
  point: StudentPoint;
  rank: {
    ranking: number;
    totalMemberCnt: number;
    lastMonthRanking: number;
  };
  myReservation: {
    scheduleId: number;
    lessonDt: string;
    lessonStartTime: string;
    lessonEndTime: string;
    trainerName: string;
    reservationStatus: string;
  };
  lessonHistory: {
    id: number;
    title: string;
    content: string;
    commentTotalCount: number;
    createdAt: string;
    student: string;
    trainer: string;
    scheduleId: number;
    lessonDt: string;
    lessonTime: string;
    attendanceStatus: string;
    files: { fileUrl: string; fileOrder: number; createdAt: string };
  };
  diet: {
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
      gym: null | { id: number; name: string };
      socialType: ['NONE', 'KAKAO', 'NAVER', 'GOOGLE'];
    };
    likeCnt: number;
    commentCnt: number;
    fastBreakfast: boolean;
    fastLunch: boolean;
    fastDinner: boolean;
    dietFiles: [
      {
        id: number;
        dietId: number;
        fileUrl: string;
        type: string;
      },
    ];
  };
  gym: Gym;
  mapped: boolean;
}
export const useStudentHomeDataQuery = () => {
  return useQuery<HomeDataResponse, BaseError>({
    queryKey: ['StudentHomeData'],
    queryFn: async () => {
      const result =
        await authApi.get<BaseResponse<HomeDataResponse>>(`/api/home/v1/student`);
      return result.data.data;
    },
  });
};
