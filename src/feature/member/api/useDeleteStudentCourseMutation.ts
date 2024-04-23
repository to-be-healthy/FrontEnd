import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useDeleteStudentCourseMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (courseId: number) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/course/v1/${courseId}`
      );
      console.log(result);
      return result.data;
    },
  });
};
