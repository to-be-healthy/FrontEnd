import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useDeleteExerciseMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (exerciseId) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/exercise/v1/${exerciseId}`
      );
      return result.data;
    },
  });
};
