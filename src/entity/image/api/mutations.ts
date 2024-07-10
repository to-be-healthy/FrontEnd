import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { ImageType } from '../model/types';

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

interface UploadS3ImageRequest {
  url: string;
  file: File;
}

export const useS3UploadImagesMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, UploadS3ImageRequest>({
    mutationFn: async ({ url, file }: UploadS3ImageRequest) => {
      const result = await axios.put<BaseResponse<null>>(url, file);
      return result.data;
    },
  });
};

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
        `/api/lessonhistory/v1/file`,
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
