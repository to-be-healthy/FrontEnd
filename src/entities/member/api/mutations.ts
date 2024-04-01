import { useMutation } from '@tanstack/react-query';

import { GymList } from '@/entities/auth/model/types';
import { api, BaseError, BaseResponse } from '@/shared/api';

const getGymList = async () => {
  const result = await api.get<BaseResponse<GymList[]>>(`/api/gyms/v1`);
  return result.data.data;
};

const useRegisterGymMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (gymId) => {
      const result = await api.post<BaseResponse<boolean>>(`/api/gyms/v1/${gymId}`);
      return result.data;
    },
  });
};

export { getGymList, useRegisterGymMutation };
