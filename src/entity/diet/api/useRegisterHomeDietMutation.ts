import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { Diet } from '@/feature/member';
import { BaseError, BaseResponse } from '@/shared/api';

interface RegisterDietRequest {
  type: string;
  file: string | null;
  fast: boolean;
  eatDate: string;
}

export const useRegisterHomeDietMutation = () => {
  return useMutation<BaseResponse<Diet>, BaseError, RegisterDietRequest>({
    mutationFn: async (params) => {
      const result = await authApi.post<BaseResponse<Diet>>(`/api/diets/v1/home`, params);
      return result.data;
    },
  });
};
