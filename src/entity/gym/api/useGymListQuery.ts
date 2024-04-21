import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { Gym } from '../model/types';

type GymListResponse = Gym[] | null;

export const useGymListQuery = () => {
  return useQuery<GymListResponse, BaseError>({
    queryKey: ['gymList'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<GymListResponse>>(`/api/gyms/v1`);
      return result.data.data;
    },
  });
};
