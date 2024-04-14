import { useMutation } from '@tanstack/react-query';

import { GymList } from '@/entities/auth/model/types';
import { api, BaseError, BaseResponse } from '@/shared/api';

import { InviteRequest, InviteResponse, RegisterGymRequest } from '../model/types';

const getGymList = async () => {
  const result = await api.get<BaseResponse<GymList[]>>(`/api/gyms/v1`);
  return result.data.data;
};

const useRegisterGymMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, RegisterGymRequest>({
    mutationFn: async (params: RegisterGymRequest) => {
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

const useInviteStudent = () => {
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

export { getGymList, useInviteStudent, useRegisterGymMutation };
