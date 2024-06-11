import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

interface UploadImagesRequest {
  uploadFiles: FileList;
}

export const useUploadImageMutation = () => {
  return useMutation<BaseResponse<ImageType[]>, BaseError, UploadImagesRequest>({
    mutationFn: async ({ uploadFiles }) => {
      const formData = new FormData();
      Array.from(uploadFiles).forEach((el) => {
        formData.append('uploadFiles', el);
      });
      const result = await authApi.post<BaseResponse<ImageType[]>>(
        `/api/workout-histories/v1/file`,
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
