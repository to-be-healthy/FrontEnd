'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
dayjs.locale('ko');
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useStudentMypageTrainerInfoQuery } from '@/feature/member';
import { IconAlertCircle, IconAvatar, IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const NoTrainer = () => {
  return (
    <li
      className={cn(
        Typography.TITLE_1_BOLD,
        'flex flex-col items-center justify-center py-28 text-gray-700'
      )}>
      <span className='mb-5 w-[35px]'>
        <IconAlertCircle />
      </span>
      등록된 트레이너가 없습니다.
    </li>
  );
};

const TrainerInfoPage = () => {
  const router = useRouter();
  const { data } = useStudentMypageTrainerInfoQuery();

  return (
    <Layout>
      <Layout.Header>
        <button onClick={() => router.back()}>
          <IconBack />
        </button>
      </Layout.Header>
      <Layout.Contents>
        {!data && <NoTrainer />}
        {data && (
          <section className='px-7 py-6'>
            <div className='flex flex-col items-center pb-11'>
              <div className='mb-6 flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full border border-gray-300'>
                {data.trainer.profile ? (
                  <Image
                    src={`${data?.trainer.profile.fileUrl}?w=300&h=300&q=90`}
                    width={80}
                    height={80}
                    alt='profile'
                    className='object-contain'
                  />
                ) : (
                  <IconAvatar width={80} height={80} />
                )}
              </div>
              <p className={cn(Typography.HEADING_2, 'mb-[2px] text-black')}>
                {data.trainer.name}
              </p>
              <span className={cn(Typography.BODY_3, 'text-gray-600')}>트레이너</span>
            </div>

            <div className='rounded-lg bg-white px-6 py-7'>
              <dl className='mb-6 flex items-center justify-between'>
                <dt className={cn(Typography.BODY_2, 'text-gray-600')}>이메일</dt>
                <dd className={cn(Typography.TITLE_2, 'text-black')}>
                  {data.trainer.email}
                </dd>
              </dl>
              <dl className='flex items-center justify-between'>
                <dt className={cn(Typography.BODY_2, 'text-gray-600')}>헬스장</dt>
                <dd className={cn(Typography.TITLE_2, 'text-black')}>
                  {data.trainer.gym.name}
                </dd>
              </dl>
            </div>
          </section>
        )}
      </Layout.Contents>
    </Layout>
  );
};

export { TrainerInfoPage };
