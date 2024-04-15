import { useQuery } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { Member } from '../model/types';

export const useMyInfo = () => {
  return useQuery<Member, BaseError>({
    queryKey: ['myinfo'],
    queryFn: async () => {
      const result = await api.get<BaseResponse<Member>>(`/api/members/v1/me`);
      return result.data.data;
    },
  });
};
