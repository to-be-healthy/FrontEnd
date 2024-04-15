import { useQuery } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { GymItem } from '../model/types';

type GymListResponse = GymItem[] | null;

export const useGetGymList = () => {
  return useQuery<GymListResponse, BaseError>({
    queryKey: ['gymList'],
    queryFn: async () => {
      const result = await api.get<BaseResponse<GymListResponse>>(`/api/gyms/v1`);
      return result.data.data;
    },
  });
};
