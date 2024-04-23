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
    mutationFn: async (addCourseInfo) => {
      const result = await authApi.patch<BaseResponse<null>>(
        `/api/course/v1/${addCourseInfo.courseId}`,
        addCourseInfo
      );
      return result.data;
    },
  });
};
