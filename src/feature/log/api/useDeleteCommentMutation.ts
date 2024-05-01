import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface DeleteLogCommentRequest {
  id: number;
}

export const useDeleteCommentMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, DeleteLogCommentRequest>({
    mutationFn: async ({ id }) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/comment/${id}`
      );
      return result.data;
    },
  });
};
