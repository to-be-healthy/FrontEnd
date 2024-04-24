import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface RegisterStudentCourseInfo {
  memberId: number;
  lessonCnt: number;
}

export const useRegisterStudentCourseMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, RegisterStudentCourseInfo>({
    mutationFn: async (registerCourseInfo) => {
      const result = await authApi.post<BaseResponse<null>>(
        `/api/course/v1`,
        registerCourseInfo
      );
      return result.data;
    },
  });
};
