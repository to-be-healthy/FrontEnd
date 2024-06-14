'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import { useMyInfoQuery } from '@/feature/member';
import {
  IconArrowRightSmall,
  IconAvatar,
  IconClassLog,
  IconDiet,
  IconExerciseLog,
} from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

export const StudentMyPage = () => {
  const { data } = useMyInfoQuery();
  const today = new Date();
  const month = dayjs(today).format('YYYY-MM');

  return (
    <Layout type='student'>
      <Layout.Header className='bg-white' />
      <Layout.Contents>
        {data && (
          <Link href={'/student/mypage/info'}>
            <article className='flex items-center justify-between bg-white px-7 pb-7 pt-6'>
              <div className='flex'>
                {data?.profile ? (
                  <div className='h-[82px] w-[82px] overflow-hidden rounded-[9999px]'>
                    <Image
                      src={data?.profile.fileUrl}
                      width={82}
                      height={82}
                      alt='profile'
                      className='h-full object-cover'
                    />
                  </div>
                ) : (
                  <IconAvatar width={82} height={82} />
                )}

                <div className='ml-5 flex flex-col justify-center'>
                  <p className={cn(Typography.HEADING_3)}>{data?.name ?? ''}</p>
                  <span className={cn(Typography.BODY_3, 'text-gray-500')}>
                    {data?.socialType === 'NONE' ? data.userId : data?.email}
                  </span>
                </div>
              </div>
              <IconArrowRightSmall stroke={'var(--gray-400)'} />
            </article>
          </Link>
        )}

        <div className='bg-white py-6 pb-9'>
          <article className='mypage-box-shadow m-auto flex w-[320px] items-center justify-between rounded-lg bg-white px-8 py-5'>
            <div className='flex flex-col items-center justify-center gap-y-5'>
              <IconClassLog />
              <Link href='/student/log'>수업일지</Link>
            </div>
            <span className='mx-9 h-11 w-[1px] border border-gray-200' />
            <div className='flex flex-col items-center justify-center gap-y-5'>
              <IconDiet />
              <Link href={`/student/diet?month=${month}`}>식단</Link>
            </div>
            <span className='mx-9 h-11 w-[1px] border border-gray-200' />
            <div className='flex flex-col items-center justify-center gap-y-5'>
              <IconExerciseLog />
              <Link href='/student/workout'>운동기록</Link>
            </div>
          </article>
        </div>

        <ul>
          <li>
            <Link
              href={`/student/mypage/last-reservation?month=${month}`}
              className='flex items-center justify-between bg-white px-7 py-[15px]'>
              <p className={cn(Typography.BODY_1)}>지난 예약</p>
              <IconArrowRightSmall stroke={'var(--gray-400)'} />
            </Link>
          </li>
          <li>
            <Link
              href={'/student/mypage/trainer-info'}
              className='flex items-center justify-between bg-white px-7 py-[15px]'>
              <p className={cn(Typography.BODY_1)}>트레이너 정보</p>
              <IconArrowRightSmall stroke={'var(--gray-400)'} />
            </Link>
          </li>
          <li>
            <Link
              href={'/student/mypage/alarm'}
              className='flex items-center justify-between bg-white px-7 py-[15px]'>
              <p className={cn(Typography.BODY_1)}>알림 설정</p>
              <IconArrowRightSmall stroke={'var(--gray-400)'} />
            </Link>
          </li>
          <li>
            <Link
              href={'/policy'}
              className='flex items-center justify-between bg-white px-7 py-[15px]'>
              <p className={cn(Typography.BODY_1)}>약관 및 정책</p>
              <IconArrowRightSmall stroke={'var(--gray-400)'} />
            </Link>
          </li>
          <li>
            <Link
              href={'/cs'}
              className='flex items-center justify-between bg-white px-7 py-[15px]'>
              <p className={cn(Typography.BODY_1)}>고객센터</p>
              <IconArrowRightSmall stroke={'var(--gray-400)'} />
            </Link>
          </li>
        </ul>

        <div className='flex justify-between bg-white px-7 py-[15px]'>
          <p className={cn(Typography.BODY_1)}>앱 버전</p>
          <span className={cn(Typography.BODY_1, 'text-gray-500 ')}>최신 버전</span>
        </div>

        <footer className='flex flex-col items-start gap-4 bg-transparent p-7'>
          <span className={cn(Typography.BODY_2, 'text-gray-500')}>앱 버전 0.0</span>
          <Link
            href={'#'}
            className={cn(Typography.BODY_2, 'border-b border-gray-300 text-gray-500')}>
            오픈 소스 라이선스 보기
          </Link>
        </footer>
      </Layout.Contents>
    </Layout>
  );
};
