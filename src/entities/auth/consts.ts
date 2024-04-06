import { Provider } from './model/types';

// const BASE_REDIRECT_URI = process.env.NEXT_PUBLIC_WEB_URI;
const BASE_REDIRECT_URI = 'http://localhost:3000'; // localhost:3000 개발용

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const genRedirectUri = (provider: Provider) =>
  `${BASE_REDIRECT_URI}/${provider}/callback`;

const kakaoRedirectUri = genRedirectUri('kakao');
const naverRedirectUri = genRedirectUri('naver');
const googleRedirectUri = genRedirectUri('google');

const KAKAO_SOCIAL_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${kakaoRedirectUri}&response_type=code`;
const NAVER_SOCIAL_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&redirect_uri=${naverRedirectUri}&response_type=code`;
const GOOGLE_SOCIAL_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${googleRedirectUri}&response_type=code&scope=email profile`;

const NAME_REGEXP = /^[가-힣a-zA-Z]+$/;
const EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const EXCLUDE_SPACE_REGEXP = /^\S*$/;
const ID_REGEXP = /^[0-9a-zA-Z]{4,}$/;
const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export {
  EMAIL_REGEXP,
  EXCLUDE_SPACE_REGEXP,
  GOOGLE_SOCIAL_AUTH_URL,
  googleRedirectUri,
  ID_REGEXP,
  KAKAO_SOCIAL_AUTH_URL,
  kakaoRedirectUri,
  NAME_REGEXP,
  NAVER_SOCIAL_AUTH_URL,
  naverRedirectUri,
  PASSWORD_REGEXP,
};
