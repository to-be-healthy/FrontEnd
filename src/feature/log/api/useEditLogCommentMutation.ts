import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

interface EditLogRequest {
  images?: ImageType[];
  content: string;
  commentId: number;
}

export const useEditLogCommentMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, EditLogRequest>({
    mutationFn: async ({ content, commentId }) => {
      const payload = {
        content,
      };
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/comment/${commentId}`,
        payload
      );
      return result.data;
    },
  });
};
