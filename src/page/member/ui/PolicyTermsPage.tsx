'use client';

import { useRouter } from 'next/navigation';

import { IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const PolicyTermsPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Layout.Header>
        <button onClick={() => router.back()}>
          <IconBack />
        </button>
        <h1 className={cn(Typography.HEADING_4_SEMIBOLD, 'layout-header-title')}>
          이용약관
        </h1>
      </Layout.Header>
    </Layout>
  );
};

export { PolicyTermsPage };
