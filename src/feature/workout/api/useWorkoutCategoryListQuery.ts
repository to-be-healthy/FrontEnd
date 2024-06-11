import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface WorkoutCategory {
  category: string;
  name: string;
}

export const useWorkoutCategoryListQuery = () => {
  return useQuery<WorkoutCategory[], BaseError>({
    queryKey: ['workoutCategory'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<WorkoutCategory[]>>(
        '/api/exercise/v1/category'
      );
      return result.data.data;
    },
  });
};
