import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateLogRequest {
  uploadFiles?: ImageData[];
  title: string;
  content: string;
  studentId: number;
  scheduleId: number;
}

export const useCreateLogMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/register`,
        payload
      );
      return result.data;
    },
  });
};
