import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useDeleteRefundStudentMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (memberId: number) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/trainers/v1/members/${memberId}/refund`
      );
      return result.data;
    },
  });
};
