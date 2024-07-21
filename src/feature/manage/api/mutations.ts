import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { AppendMemberForm, InviteForm } from '@/feature/manage';
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

type AppendMemberRequest = AppendMemberForm & {
  memberId: number;
};

interface AppendMemberResponse {
  uuid: string;
}

/**
 *
 * @description 가입된 회원 추가
 */
export const useAppendMemberMutation = () => {
  return useMutation<BaseResponse<AppendMemberResponse>, BaseError, AppendMemberRequest>({
    mutationFn: async ({ lessonCnt, memberId }) => {
      const result = await authApi.post<BaseResponse<AppendMemberResponse>>(
        `/api/trainers/v1/members/${memberId}`,
        { lessonCnt }
      );
      return result.data;
    },
  });
};

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

export const useDeleteStudentMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (memberId: number) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/trainers/v1/members/${memberId}`
      );
      return result.data;
    },
  });
};

interface InviteResponse {
  uuid: string;
  invitationLink: string;
}

/**
 *
 * @description 미가입 회원 직접 추가하기
 */
export const useInviteStudentMutation = () => {
  return useMutation<BaseResponse<InviteResponse>, BaseError, InviteForm>({
    mutationFn: async (invitationInfo) => {
      const result = await authApi.post<BaseResponse<InviteResponse>>(
        '/api/trainers/v1/nonmember',
        invitationInfo
      );
      return result.data;
    },
  });
};
