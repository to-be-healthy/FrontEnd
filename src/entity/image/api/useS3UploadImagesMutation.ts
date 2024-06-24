import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { BaseError, BaseResponse } from '@/shared/api';

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
