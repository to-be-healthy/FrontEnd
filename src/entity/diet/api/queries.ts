import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { HomeDietData } from '../model/types';

interface DietRequest {
  searchDate: string;
  size: number;
}

interface DietResponse extends Pageable {
  content: HomeDietData[];
}

export const useDietListQuery = ({ searchDate, size }: DietRequest) => {
  return useInfiniteQuery<DietResponse, BaseError>({
    queryKey: ['dietList', { searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<DietResponse>>(
        `/api/members/v1/me/diets?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: DietResponse, allPages: DietResponse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};

interface CalendarMyDietRequest {
  startDate: string;
  endDate: string;
}

interface CalendarMyDietResponse {
  dietNoticeStatus: 'DISABLE' | 'ENABLED';
  uploadDays: string[];
}

export const useStudentCalendarMyDietListQuery = ({
  startDate,
  endDate,
}: CalendarMyDietRequest) => {
  return useQuery<CalendarMyDietResponse, BaseError>({
    queryKey: ['studentCalendarMyDietList', startDate, endDate],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<CalendarMyDietResponse>>(
        `/api/diets/v1/upload-date?startDate=${startDate}&endDate=${endDate}`
      );
      return res.data.data;
    },
  });
};

export const useStudentDietDetailQuery = (dietId: number) => {
  return useQuery<HomeDietData, BaseError>({
    queryKey: ['studentDietDetail', dietId],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<HomeDietData>>(
        `/api/diets/v1/${dietId}`
      );
      return {
        ...result.data.data,
        breakfast: { ...result.data.data.breakfast, type: 'breakfast' },
        lunch: { ...result.data.data.lunch, type: 'lunch' },
        dinner: { ...result.data.data.dinner, type: 'dinner' },
      };
    },
  });
};

interface FeedbackDietRequest {
  searchDate: string;
  size: number;
}
interface FeedbackDietResponse extends Pageable {
  content: HomeDietData[];
  mainData: null;
}

export const useStudentFeedbackDietListQuery = ({
  searchDate,
  size,
}: FeedbackDietRequest) => {
  return useInfiniteQuery<FeedbackDietResponse, BaseError>({
    queryKey: ['trainerStudentFeedbackDietList', { searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<FeedbackDietResponse>>(
        `/api/trainers/v1/diets?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (
      lastPage: FeedbackDietResponse,
      allPages: FeedbackDietResponse[]
    ) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};

interface StudentDietRequest {
  memberId: number;
  searchDate: string;
  size: number;
}

interface StudentDietResponse extends Pageable {
  content: HomeDietData[];
}

export const useTrainerStudentDietListQuery = ({
  memberId,
  searchDate,
  size,
}: StudentDietRequest) => {
  return useInfiniteQuery<StudentDietResponse, BaseError>({
    queryKey: ['trainerStudentdietList', { searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentDietResponse>>(
        `/api/members/v1/${memberId}/diets?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (
      lastPage: StudentDietResponse,
      allPages: StudentDietResponse[]
    ) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};
