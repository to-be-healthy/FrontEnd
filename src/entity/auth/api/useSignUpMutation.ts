import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { BaseError, BaseResponse } from '@/shared/api';

import { SignUpRequest } from '../model/types';

interface SignUpResponse {
  id: number;
  email: string;
  userId: string;
  name: string;
  memberType: string;
}

export const useSignUpMutation = () => {
  return useMutation<BaseResponse<SignUpResponse>, BaseError, SignUpRequest>({
    mutationFn: async (params) => {
      const result = await axios.post<BaseResponse<SignUpResponse>>(
        `/api/auth/v1/join`,
        params
      );
      return result.data;
    },
  });
};
