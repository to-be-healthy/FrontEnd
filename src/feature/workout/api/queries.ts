import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import {
  CommunityWorkout,
  ExerciseType,
  Workout,
  WorkoutCategory,
  WorkoutDetail,
  WorkoutMember,
} from '../model/types';
import { WorkoutComment } from '../model/types';

const DEFAULT_WORKOUT_SIZE = 20;
const DEFAULT_COMMUNITY_SIZE = 10;

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
  size = DEFAULT_WORKOUT_SIZE,
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
  size = DEFAULT_WORKOUT_SIZE,
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
  size = DEFAULT_WORKOUT_SIZE,
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

interface CommunityRequest {
  searchDate?: string;
  size?: number;
  memberId?: string | number | null;
}

interface CommunityResponse extends Pageable {
  content: CommunityWorkout[];
  mainData: WorkoutMember;
}

export const useCommunityQuery = ({
  searchDate,
  size = DEFAULT_COMMUNITY_SIZE,
  memberId,
}: CommunityRequest = {}) => {
  return useInfiniteQuery<CommunityResponse, BaseError>({
    queryKey: ['workoutList', { memberId }],
    queryFn: async ({ pageParam }) => {
      const queryParams = new URLSearchParams();
      queryParams.append('page', (pageParam as number).toString());
      queryParams.append('size', size.toString());
      if (searchDate) {
        queryParams.append('searchDate', searchDate.toString());
      }
      if (memberId) {
        queryParams.append('memberId', memberId.toString());
      }

      try {
        const res = await authApi.get<BaseResponse<CommunityResponse>>(
          `/api/community/v1?${queryParams.toString()}`
        );
        return res.data.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const responseData = error.response?.data as { message?: string };
          const message = responseData.message ?? '문제가 발생했습니다.';
          throw new Error(message);
        }
        throw new Error('문제가 발생했습니다.');
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: CommunityResponse, allPages: CommunityResponse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
    retry: 1,
  });
};
