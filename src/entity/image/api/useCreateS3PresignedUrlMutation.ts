import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface PresignedUrlResponse {
  fileUrl: string;
  fileOrder: number;
}
export const useCreateS3PresignedUrlMutation = () => {
  return useMutation<BaseResponse<PresignedUrlResponse[]>, BaseError, string[]>({
    mutationFn: async (fileNames) => {
      const result = await authApi.post<BaseResponse<PresignedUrlResponse[]>>(
        '/api/file/v1',
        {
          fileNames,
        }
      );

      return result.data;
    },
  });
};
