import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { WorkoutComment } from '../model/types';

const DEFAULT_SIZE = 20;

interface WorkoutCommentResponse extends Pageable {
  content: WorkoutComment[];
}

interface WorkoutCommentRequest {
  workoutHistoryId: number;
  size?: number;
}

export const useWorkoutCommentQuery = ({
  workoutHistoryId,
  size = DEFAULT_SIZE,
}: WorkoutCommentRequest) => {
  return useInfiniteQuery<WorkoutCommentResponse, BaseError>({
    queryKey: ['workoutComment', { workoutHistoryId }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<WorkoutCommentResponse>>(
        `/api/workout-histories/v1/${workoutHistoryId}/comments?page=${pageParam as number}&size=${size}`
      );
      return res.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (
      lastPage: WorkoutCommentResponse,
      allPages: WorkoutCommentResponse[]
    ) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};
