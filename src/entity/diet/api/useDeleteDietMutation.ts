import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useDeleteDietMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (dietId: number) => {
      const result = await authApi.delete<BaseResponse<null>>(`/api/diets/v1/${dietId}`);
      return result.data;
    },
  });
};
