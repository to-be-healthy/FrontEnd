import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface EditmemoRequest {
  studentId: number;
  memo: string;
}

export const useEditMemoMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, EditmemoRequest>({
    mutationFn: async ({ studentId, memo }) => {
      const result = await authApi.put<BaseResponse<null>>(
        `/api/members/v1/${studentId}/memo`,
        {
          memo,
        }
      );
      return result.data;
    },
  });
};
