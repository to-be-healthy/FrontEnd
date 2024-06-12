import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface EditWorkoutCommentRequest {
  commentId: number;
  content: string;
}
export const useEditWorkoutCommentMutation = (workoutHistoryId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, EditWorkoutCommentRequest>({
    mutationFn: async ({ commentId, content }) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/workout-histories/v1/${workoutHistoryId}/comments/${commentId}`,
        { content }
      );
      return result.data;
    },
  });
};
