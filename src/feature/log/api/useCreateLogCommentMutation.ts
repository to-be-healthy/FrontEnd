import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateLogCommentRequest {
  images?: ImageType[];
  content: string;
}
export const useCreateLogCommentMutation = (logId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogCommentRequest>({
    mutationFn: async ({ content, images }) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/${logId}/comment`,
        { content, uploadFiles: images }
      );
      return result.data;
    },
  });
};
