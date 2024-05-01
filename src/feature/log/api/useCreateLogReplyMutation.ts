import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateLogReplyRequest {
  uploadFiles?: ImageData[];
  comment: string;
  id: number;
}

export const useCreateLogReplyMutation = (logId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogReplyRequest>({
    mutationFn: async ({ uploadFiles, comment, id }) => {
      const payload = {
        uploadFiles,
        request: {
          comment,
        },
      };
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/${logId}/comment/${id}`,
        payload,
        {
          headers: {
            'Content-Type':
              'multipart/form-data; boundary=<calculated when request is sent>',
          },
        }
      );
      return result.data;
    },
  });
};
