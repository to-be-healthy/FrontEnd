import { useMutation } from '@tanstack/react-query';

import { GymList } from '@/entities/auth/model/types';
import { api, BaseError, BaseResponse } from '@/shared/api';

const getGymList = async () => {
  const result = await api.get<BaseResponse<GymList[]>>(`/api/gyms/v1`);
  return result.data.data;
};

interface SelectGym {
  memberType: string;
  gymId: number;
  joinCode?: number;
}
const useRegisterGymMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, SelectGym>({
    mutationFn: async (params: SelectGym) => {
      if (params.memberType === 'TRAINER') {
        const result = await api.post<BaseResponse<boolean>>(
          `/api/gyms/v1/${params.gymId}?joinCode=${params.joinCode}`,
          {
            params: { gymId: params.gymId, joinCode: params.joinCode },
          }
        );
        return result.data;
      } else {
        const result = await api.post<BaseResponse<boolean>>(
          `/api/gyms/v1/${params.gymId}`
        );
        return result.data;
      }
    },
  });
};

export { getGymList, useRegisterGymMutation };
