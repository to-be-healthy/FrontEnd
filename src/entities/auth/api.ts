import axios, { AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

import { BaseResponse } from '@/shared/api';

import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from './model';

export const requestSignIn = async (credential: SignInRequest) => {
  const result: AxiosResponse<BaseResponse<SignInResponse>> = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH_URL}/api/v1/auth/login`,
    credential
  );
  return result.data;
};

export const requestRefreshToken = async () => {
  const session = await getSession();
  const refreshToken = session?.refreshToken;
  const userId = 'not-yet';
  if (!refreshToken || !userId)
    throw new Error('리프레시 토큰이나 유저 정보가 없습니다.');

  const result: BaseResponse<SignInResponse> = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH_URL}/api/v1/auth/efresh-token?userId=${userId}&refreshToken=${refreshToken}`
  );
  return result;
};

export const checkVailableId = async (userId: string) => {
  const result: AxiosResponse<BaseResponse<boolean>> = await axios.get(
    `/auth/v1/validation/user-id?userId=${userId}`
  );
  return result.data;
};

export const sendEmailVerificationCode = async (email: string) => {
  const result: AxiosResponse<BaseResponse<string>> = await axios.post(
    `/auth/v1/validation/send-email?email=${email}`
  );
  return result.data;
};

export const checkVerificationCode = async (email: string, emailKey: string) => {
  const result: AxiosResponse<BaseResponse<boolean>> = await axios.post(
    `/auth/v1/validation/confirm-email?email=${email}&&emailKey=${emailKey}`
  );
  return result.data;
};

export const requestSignUp = async (params: SignUpRequest) => {
  const result: AxiosResponse<BaseResponse<SignUpResponse>> = await axios.post(
    `/auth/v1/join`,
    {
      userId: params.userId,
      email: params.email,
      password: params.password,
      passwordConfirm: params.passwordConfirm,
      name: params.name,
      memberType: params.memberType,
      trainerId: params.trainerId ? params.trainerId : '',
    }
  );
  return result.data;
};
