import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { WorkoutDetail } from '../model/types';

export const useWorkoutDetailQuery = (workoutHistoryId: number) => {
  return useQuery<WorkoutDetail, BaseError>({
    queryKey: ['workoutDetail', workoutHistoryId],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<WorkoutDetail>>(
        `/api/workout-histories/v1/${workoutHistoryId}`
      );
      return result.data.data;
    },
  });
};
