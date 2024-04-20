import { useMutation } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

interface EditStudentNickname {
  studentId: number;
  nickname: string;
}

export const useEditStudentNicknameMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, EditStudentNickname>({
    mutationFn: async ({ studentId, nickname }) => {
      const result = await api.post<BaseResponse<boolean>>(
        `/api/members/v1/nickname/${studentId}?nickname=${nickname}`
      );
      return result.data;
    },
  });
};
