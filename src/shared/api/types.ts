export interface BaseResponse<T> {
  statusCode: string;
  message: string;
  data: T;
}
