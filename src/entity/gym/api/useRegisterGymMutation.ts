import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface RegisterGymRequest {
  memberType: string;
  gymId: number;
  joinCode?: number;
}

export const useRegisterGymMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, RegisterGymRequest>({
    mutationFn: async ({ gymId, memberType, joinCode }) => {
      const queryParams = memberType === 'TRAINER' ? `?joinCode=${joinCode}` : '';
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/gyms/v1/${gymId}${queryParams}`
      );
      return result.data;
    },
  });
};
