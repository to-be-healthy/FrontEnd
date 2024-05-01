import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface EditLogRequest {
  id: number;
  comment: string;
}

export const useEditLogCommentMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, EditLogRequest>({
    mutationFn: async ({ id, comment }) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/comment/${id}`,
        {
          comment,
        }
      );
      return result.data;
    },
  });
};
