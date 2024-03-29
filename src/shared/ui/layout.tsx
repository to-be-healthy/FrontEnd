import { PropsWithChildren } from 'react';

import { MemberNavigationBar, TrainerNavigationBar } from '@/shared/ui/navigationBar';

interface Props {
  type: 'member' | 'trainer';
}

export const Layout = ({ type, children }: PropsWithChildren<Props>) => {
  return (
    <div
      className={
        // TODO) 모바일뷰 개발 편의성 임시 레이아웃 설정 - 추후 w-screen 제거
        'flex h-screen w-screen items-center justify-center bg-[#383838]'
      }>
      <div className='flex h-full w-[390px] flex-col justify-between bg-gray-100'>
        <div className='overflow-y-auto'>{children}</div>
        {type === 'trainer' && <TrainerNavigationBar />}
        {type === 'member' && <MemberNavigationBar />}
      </div>
    </div>
  );
};
