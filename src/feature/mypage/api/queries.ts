import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { Gym } from '@/entity/gym';
import { Member } from '@/feature/manage';
import { BaseError, BaseResponse } from '@/shared/api';

export const useMyInfoQuery = () => {
  return useQuery<Member, BaseError>({
    queryKey: ['myinfo'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<Member>>(`/api/v1/members/me`);
      return result.data.data;
    },
  });
};

interface TrainerInfoResponse {
  mappingId: number;
  trainer: {
    id: number;
    email: string;
    name: string;
    profile: {
      id: number;
      fileUrl: string;
    } | null;
    gym: Gym;
  };
}

export const useStudentMypageTrainerInfoQuery = () => {
  return useQuery<TrainerInfoResponse | null, BaseError>({
    queryKey: ['trainerInfo'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<TrainerInfoResponse | null>>(
        '/api/v1/members/trainer-mapping/info'
      );
      return result.data.data;
    },
  });
};
