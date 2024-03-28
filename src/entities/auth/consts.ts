import { Provider } from './model/types';

const BASE_REDIRECT_URI = process.env.NEXT_PUBLIC_WEB_URI;

const redicreUri = (provider: Provider) => `${BASE_REDIRECT_URI}/${provider}/callback`;

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const KAKAO_SOCIAL_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${redicreUri('kakao')}&response_type=code`;
const NAVER_SOCIAL_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${redicreUri('naver')}&state=STATE_STRING`;
// const GOOGLE_SOCIAL_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/google/callback&response_type=code&scope=email profile`;
const GOOGLE_SOCIAL_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redicreUri('google')}&response_type=code&scope=email profile`;

export { GOOGLE_SOCIAL_AUTH_URL, KAKAO_SOCIAL_AUTH_URL, NAVER_SOCIAL_AUTH_URL };
