import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateLogCommentRequest {
  uploadFiles?: ImageData[];
  comment: string;
}
export const useCreateLogCommentMutation = (logId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogCommentRequest>({
    mutationFn: async ({ uploadFiles, comment }) => {
      const formData = new FormData();
      // TODO - uploadFiles
      console.log(uploadFiles);

      const blob = new Blob([JSON.stringify({ comment })], {
        type: 'application/json',
      });
      formData.append('request', blob);

      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/${logId}/comment`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return result.data;
    },
  });
};
