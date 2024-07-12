import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { ContentType } from '../model/types';

interface EditDietRequest {
  content: string;
  commentId: number;
}

export const useEditDietCommentMutation = (dietId: number) => {
  return useMutation<BaseResponse<ContentType>, BaseError, EditDietRequest>({
    mutationFn: async ({ content, commentId }: EditDietRequest) => {
      const payload = {
        content,
      };
      const result = await authApi.patch<BaseResponse<ContentType>>(
        `/api/diets/v1/${dietId}/comments/${commentId}`,
        payload
      );
      return result.data;
    },
  });
};
