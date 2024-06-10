import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { MyReservationResponse } from '../model/type';

export const useStudentMyLastReservationListQuery = (searchDate: string) => {
  return useQuery<MyReservationResponse, BaseError>({
    queryKey: ['StudentMyLastReservationList', searchDate],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MyReservationResponse>>(
        `/api/schedule/v1/student/my-reservation/old?searchDate=${searchDate}`
      );
      return res.data.data;
    },
  });
};
