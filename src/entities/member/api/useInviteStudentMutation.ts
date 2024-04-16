import { useMutation } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { InviteRequest, InviteResponse } from '../model/types';

export const useInviteStudentMutation = () => {
  return useMutation<BaseResponse<InviteResponse>, BaseError, InviteRequest>({
    mutationFn: async (invitationInfo) => {
      const result = await api.post<BaseResponse<InviteResponse>>(
        '/api/trainers/v1/invitation',
        invitationInfo
      );
      return result.data;
    },
  });
};
