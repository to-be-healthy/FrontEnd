import { Toaster } from '@/shared/ui';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div
      className={
        // TODO) 모바일뷰 개발 편의성 임시 레이아웃 설정
        'w-dvh flex h-dvh items-center justify-center bg-[#383838]'
      }>
      <div className='flex h-full w-[390px] flex-col overflow-hidden bg-white'>
        {children}
        <Toaster ViewportClassName='relative top-[-10px]' swipeDirection='right' />
      </div>
    </div>
  );
};

export default AuthLayout;
