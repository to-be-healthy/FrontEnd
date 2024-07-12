import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { Comment } from '@/feature/log-diet';
import { BaseError, BaseResponse } from '@/shared/api';

interface DietCommentRequest {
  dietId: number;
  size: number;
}

export const useDietCommentListQuery = ({ dietId, size }: DietCommentRequest) => {
  return useInfiniteQuery<Comment, BaseError>({
    queryKey: ['dietCommentList', dietId],
    queryFn: async ({ pageParam }) => {
      const result = await authApi.get<BaseResponse<Comment>>(
        `/api/diets/v1/${dietId}/comments?page=${pageParam as number}&size=${size}`
      );
      return result.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: Comment, allPages: Comment[]) => {
      return lastPage.content ? allPages.length : undefined;
    },
  });
};
