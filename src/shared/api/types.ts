import { AxiosError } from 'axios';

export interface BaseResponse<T> {
  message: string;
  data: T;
}

export type BaseError = AxiosError<{
  code: string;
  message: string;
  timestamp: string;
}>;
