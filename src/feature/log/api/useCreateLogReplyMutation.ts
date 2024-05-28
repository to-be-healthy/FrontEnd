import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateLogReplyRequest {
  images?: ImageType[];
  comment: string;
  commentId: number;
}

export const useCreateLogReplyMutation = (logId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogReplyRequest>({
    mutationFn: async ({ images, comment, commentId }) => {
      const payload = {
        comment,
        commandUploadFileResult: images,
      };
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/${logId}/comment/${commentId}`,
        payload
      );
      return result.data;
    },
  });
};
