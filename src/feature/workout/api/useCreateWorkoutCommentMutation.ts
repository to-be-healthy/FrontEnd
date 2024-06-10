import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateWorkoutCommentRequest {
  parentCommentId?: number;
  content: string;
}
export const useCreateWorkoutCommentMutation = (workoutHistoryId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateWorkoutCommentRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/workout-histories/v1/${workoutHistoryId}/comments`,
        payload
      );
      return result.data;
    },
  });
};
