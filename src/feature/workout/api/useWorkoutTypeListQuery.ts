import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { ExerciseType } from '../model/types';

const DEFAULT_SIZE = 10;

interface WorkoutRequest {
  searchValue?: string;
  size?: number;
  exerciseCategory?: string | null;
}

interface WorkoutTypeListResponse extends Pageable {
  content: ExerciseType[];
}

export const useWorkoutTypeListQuery = ({
  searchValue = '',
  size = DEFAULT_SIZE,
  exerciseCategory,
}: WorkoutRequest = {}) => {
  return useInfiniteQuery<WorkoutTypeListResponse, BaseError>({
    queryKey: ['workoutList', { searchValue, exerciseCategory }],
    queryFn: async ({ pageParam }) => {
      const queryParams = new URLSearchParams();
      queryParams.append('page', (pageParam as number).toString());
      queryParams.append('size', size.toString());
      if (exerciseCategory) {
        queryParams.append('exerciseCategory', exerciseCategory.toString());
      }
      if (searchValue) {
        queryParams.append('searchValue', searchValue);
      }
      const res = await authApi.get<BaseResponse<WorkoutTypeListResponse>>(
        `/api/exercise/v1?${queryParams.toString()}`
      );
      return res.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (
      lastPage: WorkoutTypeListResponse,
      allPages: WorkoutTypeListResponse[]
    ) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};
