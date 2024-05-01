import { AxiosError } from 'axios';

interface BaseResponse<T> {
  message: string;
  data: T;
}

type BaseError = AxiosError<{
  code: string;
  message: string;
  timestamp: string;
}>;

interface Pageable {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
}

export type { BaseError, BaseResponse, Pageable };
