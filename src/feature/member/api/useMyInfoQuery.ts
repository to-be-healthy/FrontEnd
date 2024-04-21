import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { Member } from '../model/types';

export const useMyInfoQuery = () => {
  return useQuery<Member, BaseError>({
    queryKey: ['myinfo'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<Member>>(`/api/members/v1/me`);
      return result.data.data;
    },
  });
};
