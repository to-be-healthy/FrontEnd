import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface TrainerChangeReservation {
  status: 'AVAILABLE' | 'DISABLED';
  scheduleIds: number[];
}

export const useTrainerChangeReservationMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, TrainerChangeReservation>({
    mutationFn: async ({ status, scheduleIds }: TrainerChangeReservation) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/schedule/v1/trainer/${status}`,
        { scheduleIds }
      );
      return result.data;
    },
  });
};
