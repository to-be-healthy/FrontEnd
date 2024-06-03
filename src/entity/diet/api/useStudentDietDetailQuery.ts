import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { Diet } from '@/feature/member';
import { BaseError, BaseResponse } from '@/shared/api';

export const useStudentDietDetailQuery = (dietId: number) => {
  return useQuery<Diet, BaseError>({
    queryKey: ['studentDietDetail'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<Diet>>(`/api/diets/v1/${dietId}`);
      return {
        ...result.data.data,
        breakfast: { ...result.data.data.breakfast, type: 'breakfast' },
        lunch: { ...result.data.data.lunch, type: 'lunch' },
        dinner: { ...result.data.data.dinner, type: 'dinner' },
      };
    },
  });
};
