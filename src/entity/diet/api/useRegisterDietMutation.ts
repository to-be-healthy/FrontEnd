import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { Diet } from '../model/types';

interface RegisterDietRequest {
  type: string;
  file?: FileList;
  fast: boolean;
}

export const useRegisterDietMutation = () => {
  return useMutation<BaseResponse<Diet>, BaseError, RegisterDietRequest>({
    mutationFn: async ({ type, file, fast }) => {
      const formData = new FormData();
      if (file)
        Array.from(file).forEach((el) => {
          formData.append('file', el);
        });
      const result = await authApi.post<BaseResponse<Diet>>(
        `/api/diet/v1`,
        { type, file: formData, fast },
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
