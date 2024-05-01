'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
dayjs.locale('ko');
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import {
  LogCommentContext,
  LogCommentInput,
  StudentLogCommentList,
  useLogComment,
} from '@/feature/log';
import { useStudentLogDetailQuery } from '@/feature/log/api/useStudentLogDetailQuery';
import IconBack from '@/shared/assets/images/icon_back.svg';
import IconChat from '@/shared/assets/images/icon_chat.svg';
import IconDotsVertical from '@/shared/assets/images/icon_dots_vertical.svg';
import IconNote from '@/shared/assets/images/icon_note.svg';
import IconTrash from '@/shared/assets/images/icon_trash.svg';
import { Typography } from '@/shared/mixin';
import { Button, Card, CardContent, CardFooter, CardHeader, Layout } from '@/shared/ui';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNav,
} from '@/shared/ui/carousel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/shared/utils';

interface Props {
  logId: number;
  memberId: number;
}

const StudentLogDetailPage = ({ memberId, logId }: Props) => {
  const router = useRouter();
  const { data } = useStudentLogDetailQuery({ memberId, lessonHistoryId: logId });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const value = useLogComment({ memberId, logId, ref: inputRef });

  const date = dayjs(data?.createdAt);
  const formattedDate = date.format('M월 D일 (ddd)');

  return (
    <Layout>
      <LogCommentContext.Provider value={value}>
        {data && (
          <>
            <Layout.Header>
              <Button variant='ghost' size='icon' onClick={() => router.back()}>
                <IconBack />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className={Typography.TITLE_1_SEMIBOLD}>
                    <IconDotsVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='absolute -right-5 top-0 flex w-[120px] flex-col bg-white'>
                  <DropdownMenuGroup className='flex flex-col'>
                    <DropdownMenuItem className='typography-title-3 flex items-center gap-[8px] px-[16px] py-[12px]'>
                      <IconNote />
                      수정
                    </DropdownMenuItem>
                    <DropdownMenuItem className='typography-title-3 flex items-center gap-[8px] px-[16px] py-[12px] text-point'>
                      <IconTrash />
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </Layout.Header>
            <Layout.Contents className='p-[20px]'>
              <Card className='w-full px-0'>
                <CardHeader className={cn(Typography.TITLE_3, 'px-[16px] text-gray-600')}>
                  {formattedDate}
                  {` `}
                  {data.lessonTime}
                </CardHeader>
                <CardContent className='px-[16px]'>
                  <Carousel className='mx-auto w-full' opts={{}}>
                    <CarouselContent className='mx-0 p-0'>
                      {data.files.map((file, index) => (
                        <CarouselItem key={index}>
                          <Card className='w-full'>
                            <CardContent>
                              <Image
                                src={file.fileUrl}
                                alt={'React Rendezvous'}
                                width={300}
                                height={200}
                                className={cn(
                                  'rounded-lg object-contain transition-all',
                                  'aspect-square' // 1:1
                                  // 'aspect-[3/2]' // 3:2
                                )}
                              />
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselNav />
                  </Carousel>
                  <p className={cn(Typography.BODY_3, 'px-[16px] py-[8px] text-black')}>
                    {data.content}
                  </p>
                </CardContent>
                <CardFooter>
                  <div className='space-y-[24px] rounded-bl-lg rounded-br-lg'>
                    <div className='flex w-fit items-center space-x-[6px] px-[16px]'>
                      <IconChat />
                      <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
                        댓글 <span>{data.comments.length}</span>
                      </p>
                    </div>
                    <StudentLogCommentList comments={data.comments} />
                  </div>
                </CardFooter>
              </Card>
            </Layout.Contents>
            <Layout.BottomArea className='p-0'>
              <LogCommentInput />
            </Layout.BottomArea>
          </>
        )}
      </LogCommentContext.Provider>
    </Layout>
  );
};

export { StudentLogDetailPage };
