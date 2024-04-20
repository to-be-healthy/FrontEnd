import { useQuery } from '@tanstack/react-query';

import type { Trainer } from '@/entity/auth';
import { api } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface InvitationResponse {
  name: string;
  lessonCnt: number;
  trainer: Partial<Pick<Trainer, 'name'>>;
}

export const useInvitationInfoQuery = (uuid: string) => {
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
