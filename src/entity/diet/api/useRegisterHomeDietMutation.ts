import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { HomeDietData } from '../model/types';

interface RegisterDietRequest {
  type: string;
  file: string | null;
  fast: boolean;
  eatDate: string;
}

export const useRegisterHomeDietMutation = () => {
  return useMutation<BaseResponse<HomeDietData>, BaseError, RegisterDietRequest>({
    mutationFn: async (params) => {
      const result = await authApi.post<BaseResponse<HomeDietData>>(
        `/api/diets/v1/home`,
        params
      );
      return result.data;
    },
  });
};
