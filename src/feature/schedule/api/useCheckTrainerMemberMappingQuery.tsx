import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface MappingResponse {
  mapped: boolean;
}
export const useCheckTrainerMemberMappingQuery = () => {
  return useQuery<MappingResponse, BaseError>({
    queryKey: ['checkTrainerMemberMapping'],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MappingResponse>>(
        `/api/members/v1/trainer-mapping`
      );
      return res.data.data;
    },
  });
};
