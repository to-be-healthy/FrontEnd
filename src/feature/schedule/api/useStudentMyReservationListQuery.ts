import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface ScheduleData {
  scheduleId: number;
  lessonDt: string;
  lessonStartTime: string;
  lessonEndTime: string;
  reservationStatus: string;
  trainerName: string;
}

interface CourseData {
  courseId: number;
  totalLessonCnt: number;
  remainLessonCnt: number;
  createdAt: string;
}
interface MyReservationResponse {
  course: CourseData;
  reservations: ScheduleData[];
}

export const useStudentMyReservationListQuery = (lessonDt: string) => {
  return useQuery<MyReservationResponse, BaseError>({
    queryKey: ['StudentMyReservationList', lessonDt],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MyReservationResponse>>(
        `/api/schedule/v1/student/my-reservation?lessonDt=${lessonDt}`
      );
      return res.data.data;
    },
  });
};
