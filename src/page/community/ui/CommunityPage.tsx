'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { LowercaseMemberType } from '@/entity/auth';
import { CommunityPost, NoPosts, useCommunityQuery } from '@/feature/community';
import { useMyInfoQuery } from '@/feature/member';
import { IconBack } from '@/shared/assets';
import { useQueryString } from '@/shared/hooks';
import { FLEX_CENTER, Typography } from '@/shared/mixin';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const CommunityPage = () => {
  const router = useRouter();
  const { getQueryString } = useQueryString();

  const memberId = getQueryString('memberId');

  const { data: userInfo } = useMyInfoQuery();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isError, error } =
    useCommunityQuery({
      memberId,
    });

  const lowercaseMemberType = userInfo?.memberType.toLowerCase() as LowercaseMemberType;
  const posts = data?.pages.flatMap((page) => page.content).filter(Boolean);

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch(() => {
        throw new Error('Error fetching next page');
      });
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isError) {
    throw new Error(error.message);
  }

  return (
    <Layout type={lowercaseMemberType}>
      {!memberId && (
        <Layout.Header className='relative'>
          <h1
            className={cn(
              Typography.HEADING_4_SEMIBOLD,
              'absolute left-1/2 my-auto -translate-x-1/2'
            )}>
            {userInfo?.gym.name}
          </h1>
        </Layout.Header>
      )}
      {memberId && posts && (
        <Layout.Header className='relative'>
          <Button variant='ghost' className='p-0' onClick={() => router.back()}>
            <IconBack />
          </Button>
          <h1
            className={cn(
              Typography.HEADING_4_SEMIBOLD,
              'absolute left-1/2 my-auto -translate-x-1/2'
            )}>
            {posts[0].member.name}님 운동기록
          </h1>
        </Layout.Header>
      )}
      d
      <Layout.Contents className='overflow-y-hidden pt-6'>
        {posts && (
          <div className='hide-scrollbar mt-1 flex h-full flex-1 flex-grow flex-col overflow-y-auto px-7 pb-7'>
            <div className='flex w-full flex-col gap-5'>
              {posts.length === 0 && <NoPosts />}
              {posts.length > 0 &&
                posts.map((workout) => {
                  return (
                    <Link
                      key={workout.workoutHistoryId}
                      href={`/${lowercaseMemberType}/community/${workout.workoutHistoryId}`}>
                      <CommunityPost workout={workout} />
                    </Link>
                  );
                })}
            </div>
            <div ref={ref}>
              {isFetchingNextPage && (
                <div className={cn(FLEX_CENTER, 'mt-7 w-full')}>
                  <Image src='/images/loading.gif' width={30} height={30} alt='loading' />
                </div>
              )}
            </div>
          </div>
        )}
      </Layout.Contents>
    </Layout>
  );
};

export { CommunityPage };
