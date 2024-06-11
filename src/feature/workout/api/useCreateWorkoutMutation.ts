import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

import { CompletedExercise } from '../model/types';

interface CreateWorkoutRequest {
  files?: Omit<ImageType, 'createdAt'>[];
  content: string;
  viewMySelf: boolean;
  completedExercises: Omit<
    CompletedExercise,
    'names' | 'category' | 'muscles' | 'custom'
  >[];
}

export const useCreateWorkoutMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, CreateWorkoutRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<null>>(
        '/api/workout-histories/v1',
        payload
      );
      return result.data;
    },
  });
};
