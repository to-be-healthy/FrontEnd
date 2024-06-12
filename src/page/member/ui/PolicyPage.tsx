'use client';

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
          <a
            target='_blank'
            href={'https://mewing-sun-887.notion.site/30a82fa5850c4a90b73f542f9916a735'}
            className='flex items-center justify-between px-7 py-[15px]'
            rel='noreferrer'>
            <p className={cn(Typography.BODY_1)}>서비스 이용약관</p>
            <IconArrowRightSmall stroke={'var(--gray-400)'} />
          </a>
          <a
            target='_blank'
            href={
              'https://mewing-sun-887.notion.site/fcc610c6a4c04ae2813be8ff3d98c56b?pvs=4'
            }
            className='flex items-center justify-between px-7 py-[15px]'
            rel='noreferrer'>
            <p className={cn(Typography.BODY_1)}>개인정보 처리방침</p>
            <IconArrowRightSmall stroke={'var(--gray-400)'} />
          </a>
        </section>
      </Layout.Contents>
    </Layout>
  );
};

export { PolicyPage };
