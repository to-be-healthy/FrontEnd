import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { MyWaitingResponse } from '../model/type';

export const useStudentMyWaitingListQuery = () => {
  return useQuery<MyWaitingResponse, BaseError>({
    queryKey: ['StudentMyWaitingList'],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MyWaitingResponse>>(
        `/api/schedule/waiting/v1/my-waiting`
      );
      return res.data.data;
    },
  });
};
