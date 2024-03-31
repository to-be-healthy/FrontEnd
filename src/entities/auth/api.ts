import axios, { AxiosResponse } from 'axios';

import { BaseResponse } from '@/shared/api';

import { SignUpRequest, SignUpResponse } from './model';

export const checkVailableId = async (userId: string) => {
  const result: AxiosResponse<BaseResponse<boolean>> = await axios.get(
    `/api/auth/v1/validation/user-id?userId=${userId}`
  );
  return result.data;
};

export const sendEmailVerificationCode = async (email: string) => {
  const result: AxiosResponse<BaseResponse<string>> = await axios.post(
    `/api/auth/v1/validation/send-email?email=${email}`
  );
  return result.data;
};

export const checkVerificationCode = async (email: string, emailKey: string) => {
  const result: AxiosResponse<BaseResponse<boolean>> = await axios.post(
    `/api/auth/v1/validation/confirm-email?email=${email}&&emailKey=${emailKey}`
  );
  return result.data;
};

export const requestSignUp = async (params: SignUpRequest) => {
  const result: AxiosResponse<BaseResponse<SignUpResponse>> = await axios.post(
    `/api/auth/v1/join`,
    params
  );
  return result.data;
};
