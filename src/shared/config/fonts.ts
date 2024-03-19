import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../assets/fonts/Pretendard-Thin.subset.woff',
      weight: '100',
    },
    {
      path: '../assets/fonts/Pretendard-ExtraLight.subset.woff',
      weight: '200',
    },
    {
      path: '../assets/fonts/Pretendard-Light.subset.woff',
      weight: '300',
    },
    {
      path: '../assets/fonts/Pretendard-Regular.subset.woff',
      weight: '400',
    },
    {
      path: '../assets/fonts/Pretendard-Medium.subset.woff',
      weight: '500',
    },
    {
      path: '../assets/fonts/Pretendard-SemiBold.subset.woff',
      weight: '600',
    },
    {
      path: '../assets/fonts/Pretendard-Bold.subset.woff',
      weight: '700',
    },
    {
      path: '../assets/fonts/Pretendard-ExtraBold.subset.woff',
      weight: '800',
    },
    {
      path: '../assets/fonts/Pretendard-Black.subset.woff',
      weight: '900',
    },
  ],
  variable: '--font-pretendard',
});
