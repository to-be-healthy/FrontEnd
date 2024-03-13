/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';

export const isIdAvailable = async (userId: string) => {
  try {
    const res = await axios.get(`/api/auth/validation/userId?userId=${userId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const sendEmailVerificationCode = async (email: string) => {
  try {
    const res = await axios.post(`/api/auth/send-email-verification?email=${email}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const checkVerificationCode = async (email: any, authNumber: any) => {
  try {
    const res = await axios.post(
      `/api/auth/email-verification?authNumber=${authNumber}&&email=${email}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const signUp = async (params: any, memberType: string) => {
  try {
    const res = await axios.post(`/api/auth/join`, {
      userId: params.id,
      email: params.email,
      password: params.password,
      name: params.name,
      memberType: memberType,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
