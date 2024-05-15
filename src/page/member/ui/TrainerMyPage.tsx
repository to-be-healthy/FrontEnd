'use client';

import Link from 'next/link';

import { useMyInfoQuery } from '@/feature/member';
import { IconArrowRightSmall, IconAvatar } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Layout } from '@/shared/ui';
import { cn } from '@/shared/utils';

export const TrainerMyPage = () => {
  const { data } = useMyInfoQuery();

  return (
    <Layout type='trainer'>
      <Layout.Header className='bg-white'></Layout.Header>
      <Layout.Contents>
        <section className='flex items-center justify-between bg-white px-7 pb-7 pt-6'>
          <div className='flex'>
            <IconAvatar />
            <div className='ml-5 flex flex-col justify-center'>
              <p className={cn(Typography.HEADING_3)}>{data?.name ?? ''}</p>
              <span className={cn(Typography.BODY_3, 'text-gray-500')}>
                {data?.socialType === 'NONE' ? data.userId : data?.email}
              </span>
            </div>
          </div>
          <Link href={'/trainer/mypage/info'}>
            <IconArrowRightSmall stroke={'var(--gray-400)'} />
          </Link>
        </section>
        <section className={'mt-3'}>
          <Link
            href={'/trainer/mypage/alarm'}
            className='flex justify-between bg-white px-7 py-[15px]'>
            <p className={cn(Typography.BODY_1)}>알림 설정</p>
            <IconArrowRightSmall stroke={'var(--gray-400)'} />
          </Link>
          <Link
            href={'/trainer/mypage/policy'}
            className='flex justify-between bg-white px-7 py-[15px]'>
            <p className={cn(Typography.BODY_1)}>약관 및 정책</p>
            <IconArrowRightSmall stroke={'var(--gray-400)'} />
          </Link>
          <Link
            href={'/trainer/mypage/cs'}
            className='flex justify-between bg-white px-7 py-[15px]'>
            <p className={cn(Typography.BODY_1)}>고객센터</p>
            <IconArrowRightSmall stroke={'var(--gray-400)'} />
          </Link>
          <div className='flex justify-between bg-white px-7 py-[15px]'>
            <p className={cn(Typography.BODY_1)}>앱 버전</p>
            <span className={cn(Typography.BODY_1, 'text-gray-500')}>최신 버전</span>
          </div>
        </section>
        <footer className='flex flex-col gap-4 bg-transparent p-7'>
          <span className={cn(Typography.BODY_2, 'text-gray-500')}>앱 버전 0.0</span>
          <Link href={'#'} className={cn(Typography.BODY_2, 'text-gray-500')}>
            오픈 소스 라이선스 보기
          </Link>
        </footer>
      </Layout.Contents>
    </Layout>
  );
};
