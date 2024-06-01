import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface SetProfileImageRequest {
  file: File;
}

interface SetProfileImageResponse {
  fileUrl: string;
  fileName: string;
}

export const useSetProfileImageMutation = () => {
  return useMutation<
    BaseResponse<SetProfileImageResponse>,
    BaseError,
    SetProfileImageRequest
  >({
    mutationFn: async ({ file }) => {
      const formData = new FormData();
      formData.append('file', file);
      const result = await authApi.put<BaseResponse<SetProfileImageResponse>>(
        '/api/members/v1/profile',
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
