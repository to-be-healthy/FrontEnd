import { useMutation } from '@tanstack/react-query';

import { api } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface RegisterGymRequest {
  memberType: string;
  gymId: number;
  joinCode?: number;
}

export const useRegisterGymMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, RegisterGymRequest>({
    mutationFn: async (params: RegisterGymRequest) => {
      if (params.memberType === 'TRAINER') {
        const result = await api.post<BaseResponse<boolean>>(
          `/api/gyms/v1/${params.gymId}?joinCode=${params.joinCode}`,
          {
            params: { gymId: params.gymId, joinCode: params.joinCode },
          }
        );
        return result.data;
      } else {
        const result = await api.post<BaseResponse<boolean>>(
          `/api/gyms/v1/${params.gymId}`
        );
        return result.data;
      }
    },
  });
};
