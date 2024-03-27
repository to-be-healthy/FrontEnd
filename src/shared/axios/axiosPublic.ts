/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';

export const idVailable = async (userId: string) => {
  //userId 카멜케이스로
  const res = await axios.get(`/auth/v1/validation/user-id?userId=${userId}`);
  return res.data;
};

export const sendEmailVerificationCode = async (email: string) => {
  const res = await axios.post(`/auth/v1/validation/send-email?email=${email}`);
  return res.data;
};

export const checkVerificationCode = async (email: string, emailKey: string) => {
  const res = await axios.post(
    `/auth/v1/validation/confirm-email?email=${email}&&emailKey=${emailKey}`
  );
  return res.data;
};

export const signUp = async (params: any, memberType: string) => {
  const res = await axios.post(`/auth/v1/join`, {
    userId: params.id,
    email: params.email,
    password: params.password,
    passwordConfirm: params.password,
    name: params.name,
    memberType: memberType,
    trainerId: params.trainerId ? params.trainerId : '',
  });
  console.log(res);
  return res.data;
};
