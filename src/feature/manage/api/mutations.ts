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

interface EditNicknameRequest {
  studentId: number;
  nickname: string;
}

export const useEditNicknameMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, EditNicknameRequest>({
    mutationFn: async ({ studentId, nickname }) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/members/v1/nickname/${studentId}`,
        { nickname }
      );
      return result.data;
    },
  });
};

interface ToggleAlarmStatusRequest {
  type: 'PUSH' | 'COMMUNITY' | 'FEEDBACK' | 'SCHEDULENOTICE';
  status: 'ENABLED' | 'DISABLE';
}

export const useToggleAlarmStatusMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, ToggleAlarmStatusRequest>({
    mutationFn: async ({ type, status }) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/members/v1/alarm/${type}/${status}`
      );
      return result.data;
    },
  });
};
