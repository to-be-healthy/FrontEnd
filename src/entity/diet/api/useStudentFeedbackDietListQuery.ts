import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { HomeDietData } from '../model/types';

interface DietResponse extends Pageable {
  content: HomeDietData[];
  mainData: null;
}
interface DietRequest {
  searchDate: string;
  size: number;
}

export const useStudentFeedbackDietListQuery = ({ searchDate, size }: DietRequest) => {
  return useInfiniteQuery<DietResponse, BaseError>({
    queryKey: ['trainerStudentFeedbackDietList', { searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<DietResponse>>(
        `/api/trainers/v1/diets?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: DietResponse, allPages: DietResponse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};
