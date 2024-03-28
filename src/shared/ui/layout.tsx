import { PropsWithChildren } from 'react';

import { MemberNavigation, TrainerNavigation } from '@/shared/ui';

import { cn } from '../utils';

interface Props {
  type: 'member' | 'trainer' | null;
  className?: string;
}

export const Layout = ({ type, className, children }: PropsWithChildren<Props>) => {
  return (
    <div
      className={
        // TODO) 모바일뷰 개발 편의성 임시 레이아웃 설정 - 추후 w-screen 제거
        'flex h-screen w-screen items-center justify-center bg-[#383838]'
      }>
      <div className='flex h-full w-[390px] flex-col justify-between bg-gray-100'>
        <div className={cn('h-full overflow-y-auto', className)}>{children}</div>
        {type === 'trainer' && <TrainerNavigation />}
        {type === 'member' && <MemberNavigation />}
      </div>
    </div>
  );
};
