import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface EditLogRequest {
  comment: string;
  commentId: number;
}

export const useEditLogCommentMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, EditLogRequest>({
    mutationFn: async ({ comment, commentId }) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/comment/${commentId}`,
        { comment }
      );
      return result.data;
    },
  });
};
