import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { Diet } from '@/feature/member';
import { BaseError, BaseResponse } from '@/shared/api';

import { RegisterAndEditDiet } from '../model/types';

export const useEditDietMutation = (dietId: number) => {
  return useMutation<BaseResponse<Diet>, BaseError, RegisterAndEditDiet>({
    mutationFn: async (params) => {
      const result = await authApi.patch<BaseResponse<Diet>>(
        `/api/diets/v1/${dietId}`,
        params
      );
      return result.data;
    },
  });
};
