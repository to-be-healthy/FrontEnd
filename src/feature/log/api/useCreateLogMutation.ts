import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateLogRequest {
  uploadFiles: ImageType[];
  title: string;
  content: string;
  studentId: number;
  scheduleId: number;
}

export const useCreateLogMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/lessonhistory/v1`,
        payload
      );
      return result.data;
    },
  });
};
