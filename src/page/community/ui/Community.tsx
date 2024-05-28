'use client';

import Link from 'next/link';

import { useMyInfoQuery } from '@/feature/member';
import { IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const Community = () => {
  const { data: userInfo } = useMyInfoQuery();
  return (
    <Layout type='trainer'>
      <Layout.Header className='relative'>
        <Link href='/trainer/manage'>
          <IconBack />
        </Link>
        <h1
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 my-auto -translate-x-1/2'
          )}>
          {userInfo?.gym.name}
        </h1>
      </Layout.Header>
      <Layout.Contents></Layout.Contents>
    </Layout>
  );
};

export { Community };
