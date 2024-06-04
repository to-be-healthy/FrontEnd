import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

interface DeleteLogRequest {
  logId: number;
  uploadFiles: ImageType[];
  title: string;
  content: string;
}

export const useEditLogMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, DeleteLogRequest>({
    mutationFn: async ({ logId, ...payload }) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/${logId}`,
        payload
      );
      return result.data;
    },
  });
};
