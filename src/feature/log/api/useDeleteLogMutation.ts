import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface DeleteLogRequest {
  logId: number;
}

export const useDeleteLogMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, DeleteLogRequest>({
    mutationFn: async ({ logId }) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/${logId}`
      );
      return result.data;
    },
  });
};
