import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useCancelLikeMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (workoutHistoryId) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/workout-histories/v1/${workoutHistoryId}/like`
      );
      return result.data;
    },
  });
};
