import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { MyReservationResponse } from '../model/type';

export const useTrainerStudentReservationListQuery = (memberId: number) => {
  return useQuery<MyReservationResponse, BaseError>({
    queryKey: ['TrainerStudentReservationList', memberId],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MyReservationResponse>>(
        `/api/trainers/v1/reservation/new?memberId=${memberId}`
      );
      return res.data.data;
    },
  });
};
