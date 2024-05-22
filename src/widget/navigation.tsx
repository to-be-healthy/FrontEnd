'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';

import { useCheckTrainerMemberMappingQuery } from '@/feature/schedule/api/useCheckTrainerMemberMappingQuery';
import {
  IconCalendarFilled,
  IconCalendarOutlined,
  IconCommunityFilled,
  IconCommunityOutlined,
  IconHomeFilled,
  IconHomeOutlined,
  IconProfileFilled,
  IconProfileOutlined,
} from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils';

const TrainerNavigation = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const pathname = usePathname();
  return (
    <nav className={cn('bg-white', className)} {...props}>
      <ul className='flex items-center justify-between px-[36px] py-[18px]'>
        <li>
          <Link
            href='/trainer'
            className='flex flex-col items-center justify-between gap-y-[6px]'>
            {pathname === '/trainer' ? <IconHomeFilled /> : <IconHomeOutlined />}
            <span
              className={cn(
                'text-[10px] font-semibold',
                pathname === '/trainer' ? 'text-black' : 'text-gray-700'
              )}>
              홈
            </span>
          </Link>
        </li>
        <li>
          <Link
            href='/trainer/schedule'
            className='flex flex-col items-center justify-between gap-y-[6px]'>
            {pathname === '/trainer/schedule' ? (
              <IconCalendarFilled />
            ) : (
              <IconCalendarOutlined />
            )}
            <span
              className={cn(
                'text-[10px] font-semibold',
                pathname === '/trainer/schedule' ? 'text-black' : 'text-gray-700'
              )}>
              스케줄
            </span>
          </Link>
        </li>
        <li>
          <Link
            href='/trainer/mypage'
            className='flex flex-col items-center justify-between gap-y-[6px]'>
            {pathname === '/trainer/mypage' ? (
              <IconProfileFilled />
            ) : (
              <IconProfileOutlined />
            )}
            <span
              className={cn(
                'text-[10px] font-semibold',
                pathname === '/trainer/mypage' ? 'text-black' : 'text-gray-700'
              )}>
              마이
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const StudentNavigation = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const pathname = usePathname();
  const router = useRouter();

  const showErrorToast = useShowErrorToast();
  const { refetch } = useCheckTrainerMemberMappingQuery();

  const clickCheckMappedTrainer = async () => {
    try {
      const newData = await refetch();
      if (newData.data?.mapped) {
        router.replace('/student/schedule');
      } else {
        showErrorToast('트레이너가 지정된 후에 예약 가능합니다');
      }
    } catch (error: any) {
      showErrorToast('트레이너가 지정된 후에 예약 가능합니다');
    }
  };

  return (
    <nav className={cn('bg-white', className)} {...props}>
      <ul className='flex items-center justify-between px-[36px] py-[18px]'>
        <li>
          <Link
            href='/student'
            className='flex flex-col items-center justify-between gap-y-[6px]'>
            {pathname === '/student' ? <IconHomeFilled /> : <IconHomeOutlined />}
            <span
              className={cn(
                'text-[10px] font-semibold',
                pathname === '/student' ? 'text-black' : 'text-gray-700'
              )}>
              홈
            </span>
          </Link>
        </li>
        <li>
          <Button
            variant='ghost'
            onClick={clickCheckMappedTrainer}
            className='flex flex-col items-center justify-between gap-y-[6px] p-0 leading-[15px]'>
            {pathname === '/student/schedule' ? (
              <IconCalendarFilled />
            ) : (
              <IconCalendarOutlined />
            )}
            <span
              className={cn(
                'text-[10px] font-semibold',
                pathname === '/student/schedule' ? 'text-black' : 'text-gray-700'
              )}>
              수업예약
            </span>
          </Button>
        </li>
        <li>
          <Link
            href='/student/mypage'
            className='flex flex-col items-center justify-between gap-y-[6px]'>
            {pathname === '/student/mypage' ? (
              <IconCommunityFilled />
            ) : (
              <IconCommunityOutlined />
            )}
            <span
              className={cn(
                'text-[10px] font-semibold',
                pathname === '/student/mypage' ? 'text-black' : 'text-gray-700'
              )}>
              커뮤니티
            </span>
          </Link>
        </li>
        <li>
          <Link
            href='/student/mypage'
            className='flex flex-col items-center justify-between gap-y-[6px]'>
            {pathname === '/student/mypage' ? (
              <IconProfileFilled />
            ) : (
              <IconProfileOutlined />
            )}
            <span
              className={cn(
                'text-[10px] font-semibold',
                pathname === '/student/mypage' ? 'text-black' : 'text-gray-700'
              )}>
              마이
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export { StudentNavigation, TrainerNavigation };
