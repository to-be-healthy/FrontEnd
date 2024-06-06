import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { HomeDietData, RegisterAndEditDiet } from '../model/types';

export const useRegisterDietMutation = () => {
  return useMutation<BaseResponse<HomeDietData>, BaseError, RegisterAndEditDiet>({
    mutationFn: async (params) => {
      const result = await authApi.post<BaseResponse<HomeDietData>>(
        `/api/diets/v1`,
        params
      );
      return result.data;
    },
  });
};
