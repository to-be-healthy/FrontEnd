import { useMutation } from '@tanstack/react-query';

import { api } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { AppendMemberForm } from '../model/types';

type AppendMemberRequest = AppendMemberForm & {
  memberId: number;
};

interface AppendMemberResponse {
  uuid: string;
}

export const useAppendMemberMutation = () => {
  return useMutation<BaseResponse<AppendMemberResponse>, BaseError, AppendMemberRequest>({
    mutationFn: async ({ lessonCnt, memberId }) => {
      const result = await api.post<BaseResponse<AppendMemberResponse>>(
        `/api/trainers/v1/members/${memberId}`,
        { lessonCnt }
      );
      return result.data;
    },
  });
};
