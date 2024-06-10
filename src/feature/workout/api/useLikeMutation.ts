import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useLikeMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (workoutHistoryId) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/workout-histories/v1/${workoutHistoryId}/like`
      );
      return result.data;
    },
  });
};
