'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
dayjs.locale('ko');

import { useRef } from 'react';

import {
  LogTrainerCommentContext,
  LogTrainerCommentInput,
  LogTrainerCommentList,
  useLogDetailQuery,
  useLogTrainerComment,
} from '@/feature/log';
import { IconChat } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';
import { ImageSlide } from '@/widget/image-slide';

import { Header } from './Header';

interface Props {
  logId: number;
  memberId: number;
}

const TrainerLogDetailPage = ({ memberId, logId }: Props) => {
  const { data } = useLogDetailQuery({ lessonHistoryId: logId });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const value = useLogTrainerComment({ memberId, logId, ref: inputRef });

  return (
    <LogTrainerCommentContext.Provider value={value}>
      <Layout>
        {data && (
          <>
            <Header />
            <Layout.Contents className='hide-scrollbar px-7 py-6'>
              <Card className='w-full gap-0 px-0 pb-0 pt-7'>
                <CardHeader className={cn(Typography.TITLE_3, 'px-6')}>
                  {data.lessonDt}
                  {` `}
                  {data.lessonTime}
                </CardHeader>
                <CardContent className='mt-4 px-6'>
                  <ImageSlide images={data.files} enlargeMode />
                  <p className={cn(Typography.BODY_3, 'mt-5')}>{data.content}</p>
                </CardContent>
                <CardFooter className='mb-4 mt-6 flex flex-col gap-7'>
                  <div className='flex items-center gap-2 px-6'>
                    <IconChat />
                    <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
                      댓글 <span>{data.commentTotalCount}</span>
                    </p>
                  </div>
                  <LogTrainerCommentList comments={data.comments} />
                </CardFooter>
              </Card>
            </Layout.Contents>
            <Layout.BottomArea className='p-0'>
              <LogTrainerCommentInput />
            </Layout.BottomArea>
          </>
        )}
      </Layout>
    </LogTrainerCommentContext.Provider>
  );
};

export { TrainerLogDetailPage };
