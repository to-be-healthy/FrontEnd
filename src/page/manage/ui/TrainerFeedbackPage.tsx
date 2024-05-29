'use client';

import { useRouter } from 'next/navigation';

import { IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const TrainerFeedbackPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Layout.Header className='relative'>
        <button onClick={() => router.back()}>
          <IconBack />
        </button>
        <h1
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 my-auto -translate-x-1/2'
          )}>
          피드백 작성
        </h1>
      </Layout.Header>
      <Layout.Contents>fjdksl</Layout.Contents>
    </Layout>
  );
};

export { TrainerFeedbackPage };
