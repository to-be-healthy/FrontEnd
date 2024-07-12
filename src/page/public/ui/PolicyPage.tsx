'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { IconArrowRightSmall, IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const PolicyPage = () => {
  const router = useRouter();

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <Button variant='ghost' className='p-0' onClick={() => router.back()}>
          <IconBack />
        </Button>
      </Layout.Header>
      <Layout.Contents>
        <h1 className={cn(Typography.HEADING_3, 'bg-white px-7 pb-7 pt-8')}>
          약관 및 정책
        </h1>
        <section className='mt-7'>
          <Link
            href={'/policy/terms'}
            className='flex items-center justify-between px-7 py-[15px]'
            rel='noreferrer'>
            <p className={cn(Typography.BODY_1)}>서비스 이용약관</p>
            <IconArrowRightSmall stroke={'var(--gray-400)'} />
          </Link>
          <Link
            href={'/policy/privacy'}
            className='flex items-center justify-between px-7 py-[15px]'
            rel='noreferrer'>
            <p className={cn(Typography.BODY_1)}>개인정보 처리방침</p>
            <IconArrowRightSmall stroke={'var(--gray-400)'} />
          </Link>
        </section>
      </Layout.Contents>
    </Layout>
  );
};

export { PolicyPage };
