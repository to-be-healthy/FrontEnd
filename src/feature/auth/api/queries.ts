import { useQuery } from '@tanstack/react-query';

import { api } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { InvitationResponse } from '../model/types';

export const useInvitationInfo = (uuid: string) => {
  return useQuery<InvitationResponse, BaseError>({
    queryKey: ['invitation', uuid],
    queryFn: async () => {
      const result = await api.get<BaseResponse<InvitationResponse>>(
        `/api/auth/v1/invitation/uuid?uuid=${uuid}`
      );
      return result.data.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};
