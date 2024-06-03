import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface DeleteLogCommentRequest {
  commentId: number;
  dietId: number;
}

export const useDeleteDietCommentMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, DeleteLogCommentRequest>({
    mutationFn: async ({ commentId, dietId }) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/diets/v1/${dietId}/comments/${commentId}`
      );
      return result.data;
    },
  });
};
