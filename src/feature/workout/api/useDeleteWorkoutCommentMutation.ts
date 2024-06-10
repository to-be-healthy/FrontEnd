import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface DeleteWorkoutCommentRequest {
  commentId: number;
}
export const useDeleteWorkoutCommentMutation = (workoutHistoryId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, DeleteWorkoutCommentRequest>({
    mutationFn: async ({ commentId }) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/workout-histories/v1/${workoutHistoryId}/comments/${commentId}`
      );
      return result.data;
    },
  });
};
