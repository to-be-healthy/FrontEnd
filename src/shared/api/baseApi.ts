import axios from 'axios';

// TODO) 서버 측에서 배포 주소에 대하여 CORS 허용 후 테스트 필요
// const BASE_SERVER_URL =
//   process.env.NEXT_PUBLIC_AUTH_URL ?? 'https://api.to-be-healthy.site';

// const defaultOptions: CreateAxiosDefaults = {
//   baseURL: BASE_SERVER_URL,
// };

const apiClient = () => {
  // const instance = axios.create(defaultOptions);
  const instance = axios;
  return instance;
};

export const baseApi = apiClient();
