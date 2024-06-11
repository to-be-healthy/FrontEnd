import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { Workout, WorkoutMember } from '../model/types';

const DEFAULT_SIZE = 10;

interface WorkoutRequest {
  searchDate: string;
  size?: number;
  memberId: number;
}

interface WorkoutResponse extends Pageable {
  content: Workout[];
  mainData: WorkoutMember;
}

export const useWorkoutQuery = ({
  memberId,
  searchDate,
  size = DEFAULT_SIZE,
}: WorkoutRequest) => {
  return useInfiniteQuery<WorkoutResponse, BaseError>({
    queryKey: ['workoutList', { memberId, searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<WorkoutResponse>>(
        `/api/members/v1/${memberId}/workout-histories?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: WorkoutResponse, allPages: WorkoutResponse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};
