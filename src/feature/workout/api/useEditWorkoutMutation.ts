import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

import { ExerciseForCreate } from '../model/types';

interface CreateWorkoutRequest {
  files?: Omit<ImageType, 'createdAt'>[];
  content: string;
  viewMySelf: boolean;
  completedExercises: ExerciseForCreate[];
  workoutHistoryId: number;
}

export const useEditWorkoutMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, CreateWorkoutRequest>({
    mutationFn: async ({ workoutHistoryId, ...payload }) => {
      const result = await authApi.patch<BaseResponse<null>>(
        `/api/workout-histories/v1/${workoutHistoryId}`,
        payload
      );
      return result.data;
    },
  });
};
