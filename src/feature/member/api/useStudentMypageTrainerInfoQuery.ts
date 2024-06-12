import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth/api/authApi';
import { BaseError, BaseResponse } from '@/shared/api';

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
    gym: {
      id: number;
      name: string;
    };
  };
}

export const useStudentMypageTrainerInfoQuery = () => {
  return useQuery<TrainerInfoResponse | null, BaseError>({
    queryKey: ['trainerInfo'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<TrainerInfoResponse | null>>(
        '/api/members/v1/trainer-mapping/info'
      );
      return result.data.data;
    },
  });
};
