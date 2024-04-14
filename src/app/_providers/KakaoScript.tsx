'use client';

import Script from 'next/script';

export const KakaoScript = () => {
  const onLoad = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  };

  return (
    <Script
      src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js'
      integrity='sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01'
      crossOrigin='anonymous'
      onLoad={onLoad}
    />
  );
};
