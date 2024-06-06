import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { HomeDietData } from '../model/types';

interface DietResponse extends Pageable {
  content: HomeDietData[];
}
interface DietRequest {
  memberId: number;
  searchDate: string;
  size: number;
}

export const useTrainerStudentDietListQuery = ({
  memberId,
  searchDate,
  size,
}: DietRequest) => {
  return useInfiniteQuery<DietResponse, BaseError>({
    queryKey: ['trainerStudentdietList', { searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<DietResponse>>(
        `/api/members/v1/${memberId}/diets?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: DietResponse, allPages: DietResponse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};
