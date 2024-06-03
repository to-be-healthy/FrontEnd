import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateLogCommentRequest {
  parentCommentId?: number;
  content: string;
}
export const useCreateDietCommentMutation = (dietId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogCommentRequest>({
    mutationFn: async ({ content, parentCommentId }) => {
      const payload: { content: string; parentCommentId?: number } = { content };
      if (parentCommentId !== undefined) {
        payload.parentCommentId = parentCommentId;
      }

      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/diets/v1/${dietId}/comments`,
        payload
      );
      return result.data;
    },
  });
};
