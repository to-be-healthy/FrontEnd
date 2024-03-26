'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import IconAccountFilled from '@/shared/assets/images/nav_account_filled.svg';
import IconAccountOutlined from '@/shared/assets/images/nav_account_outlined.svg';
import IconCalendarFilled from '@/shared/assets/images/nav_calendar_filled.svg';
import IconCalendarOutlined from '@/shared/assets/images/nav_calendar_Outlined.svg';
import IconHomeFilled from '@/shared/assets/images/nav_home_filled.svg';
import IconHomeOutlined from '@/shared/assets/images/nav_home_Outlined.svg';
import { cn } from '@/shared/utils/tw-utils';

export const TrainerNavigationBar = () => {
  const pathname = usePathname();
  return (
    <nav className='bg-white'>
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
              예약관리
            </span>
          </Link>
        </li>
        <li>
          <Link
            href='/trainer/mypage'
            className='flex flex-col items-center justify-between gap-y-[6px]'>
            {pathname === '/trainer/mypage' ? (
              <IconAccountFilled />
            ) : (
              <IconAccountOutlined />
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
