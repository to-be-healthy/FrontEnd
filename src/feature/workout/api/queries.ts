import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import {
  ExerciseType,
  Workout,
  WorkoutCategory,
  WorkoutDetail,
  WorkoutMember,
} from '../model/types';
import { WorkoutComment } from '../model/types';

const DEFAULT_SIZE = 20;

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

interface WorkoutTypeRequest {
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
}: WorkoutTypeRequest = {}) => {
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
