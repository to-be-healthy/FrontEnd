import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { Gym } from '@/entity/gym';
import { BaseError, BaseResponse } from '@/shared/api';

import { CourseItem, Diet, StudentPoint } from '../model/types';

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
  diet: Diet;
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
