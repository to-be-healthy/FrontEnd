import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface StudentCourseInfo {
  courseId: number;
  memberId: number;
  calculation: string;
  type: string;
  updateCnt: string;
}
export const useAddStudentCourseMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, StudentCourseInfo>({
    mutationFn: async ({ courseId, ...payload }) => {
      const result = await authApi.patch<BaseResponse<null>>(
        `/api/course/v1/${courseId}`,
        payload
      );
      return result.data;
    },
  });
};

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

export const useDeleteStudentCourseMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (courseId: number) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/course/v1/${courseId}`
      );
      return result.data;
    },
  });
};
