import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { MyReservationResponse } from '../model/type';

interface Props {
  searchDate: string;
  memberId: number;
}
export const useTrainerStudentLastReservationListQuery = ({
  searchDate,
  memberId,
}: Props) => {
  return useQuery<MyReservationResponse, BaseError>({
    queryKey: ['TrainerStudentLastReservationList', searchDate, memberId],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MyReservationResponse>>(
        `/api/trainers/v1/reservation/old?searchDate=${searchDate}&memberId=${memberId}`
      );
      return res.data.data;
    },
  });
};
