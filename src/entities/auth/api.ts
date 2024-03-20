import axios, { AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

import { BaseResponse } from '@/shared/api';

import { SignInRequest, Tokens } from './model';

export const requestSignIn = async (credential: SignInRequest) => {
  const result: AxiosResponse<BaseResponse<Tokens>> = await axios.post(
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

  const result: BaseResponse<Tokens> = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH_URL}/api/v1/auth/efresh-token?userId=${userId}&refreshToken=${refreshToken}`
  );
  return result;
};
