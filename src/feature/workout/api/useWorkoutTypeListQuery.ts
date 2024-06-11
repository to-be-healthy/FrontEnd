import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { ExerciseType } from '../model/types';

const DEFAULT_SIZE = 10;

interface WorkoutRequest {
  searchValue?: string;
  size?: number;
}

interface WorkoutTypeListResponse extends Pageable {
  content: ExerciseType[];
}

export const useWorkoutTypeListQuery = ({
  searchValue = '',
  size = DEFAULT_SIZE,
}: WorkoutRequest = {}) => {
  return useInfiniteQuery<WorkoutTypeListResponse, BaseError>({
    queryKey: ['workoutList', { searchValue }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<WorkoutTypeListResponse>>(
        `/api/exercise/v1?page=${pageParam as number}&size=${size}&searchValue=${searchValue}`
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
