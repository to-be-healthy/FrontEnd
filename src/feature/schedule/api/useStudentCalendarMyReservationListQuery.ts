import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { MyReservationResponse } from '../model/type';

export const useStudentCalendarMyReservationListQuery = (lessonDt: string) => {
  return useQuery<MyReservationResponse, BaseError>({
    queryKey: ['StudentCalendarMyReservationList', lessonDt],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MyReservationResponse>>(
        `/api/schedule/v1/student/my-reservation/old?lessonDt=${lessonDt}`
      );
      return res.data.data;
    },
  });
};
