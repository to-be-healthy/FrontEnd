import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { Diet } from '@/feature/member';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

interface DietResponse extends Pageable {
  content: Diet[];
}
interface DietRequest {
  searchDate: string;
  size: number;
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
