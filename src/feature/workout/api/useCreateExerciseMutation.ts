import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateExerciseRequest {
  category: string;
  names: string;
  muscles: string;
}

export const useCreateExerciseMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, CreateExerciseRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<null>>('/api/exercise/v1', payload);
      return result.data;
    },
  });
};
