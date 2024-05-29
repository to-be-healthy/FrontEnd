import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateLogReplyRequest {
  images?: ImageType[];
  content: string;
  commentId: number;
}

export const useCreateLogReplyMutation = (logId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogReplyRequest>({
    mutationFn: async ({ images, content, commentId }) => {
      const payload = {
        content,
        uploadFiles: images,
      };
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/${logId}/comment/${commentId}`,
        payload
      );
      return result.data;
    },
  });
};
