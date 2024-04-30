'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { StudentLogCommentList } from '@/feature/log';
import IconBack from '@/shared/assets/images/icon_back.svg';
import IconChat from '@/shared/assets/images/icon_chat.svg';
import IconDotsVertical from '@/shared/assets/images/icon_dots_vertical.svg';
import { Typography } from '@/shared/mixin';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Layout,
} from '@/shared/ui';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNav,
} from '@/shared/ui/carousel';
import { cn } from '@/shared/utils';
dayjs.locale('ko');

interface Props {
  LogId: number;
  memberId: number;
}

const StudentLogDetailPage = ({ LogId, memberId }: Props) => {
  const router = useRouter();
  console.log(LogId, memberId);

  const [data] = useState(MOCK_DATA);
  const date = dayjs(data.createdAt);
  const formattedDate = date.format('M월 D일 (ddd)');

  return (
    <Layout>
      <Layout.Header>
        <Button variant='ghost' size='icon' onClick={() => router.back()}>
          <IconBack />
        </Button>

        <Button variant='ghost' size='icon'>
          <IconDotsVertical />
        </Button>
      </Layout.Header>
      <Layout.Contents className='px-[16px] py-[20px]'>
        <Card className='w-full px-0'>
          <CardHeader className={cn(Typography.TITLE_3, 'px-[16px] text-gray-600')}>
            {formattedDate}
            {` `}
            {data.lessonTime}
          </CardHeader>
          <CardContent className='px-[16px]'>
            <Carousel className='mx-auto w-full' opts={{}}>
              <CarouselContent className='mx-0 p-0'>
                {data.fileUrl.map((file, index) => (
                  <CarouselItem key={index}>
                    <Card className='w-full'>
                      <CardContent>
                        <Image
                          src={file}
                          alt={'React Rendezvous'}
                          width={300}
                          height={200}
                          className={cn(
                            'rounded-lg object-contain transition-all',
                            'aspect-[3/2]' // 'aspect-square' // 1:1
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
            <Collapsible className='space-y-[24px] rounded-bl-lg rounded-br-lg'>
              <CollapsibleTrigger className='w-fit px-[16px]' asChild>
                <button className='flex items-center space-x-[6px]'>
                  <IconChat />
                  <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
                    댓글 <span>{data.comment.length}</span>
                  </p>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <StudentLogCommentList comments={data.comment} />
              </CollapsibleContent>
            </Collapsible>
          </CardFooter>
        </Card>
      </Layout.Contents>
    </Layout>
  );
};

export { StudentLogDetailPage };

const MOCK_DATA = {
  id: 6,
  title: '내가 원하는 제목으로 바꾸자!',
  content: '내가 원하는 내용으로 바꾸자!',
  comment: [
    {
      id: 11,
      content: '내가 원하는 댓글 내용으로 바꾸겠음!',
      writerId: 242,
      writerName: '김진영',
      parentId: null,
      reply: [
        {
          id: 12,
          content: '네!! 화이팅입니다 ^^',
          writerId: 243,
          writerName: '박혜민',
          parentId: null,
        },
      ],
    },
    {
      id: 13,
      content: '네네!! 잘 부탁드려요^^',
      writerId: 242,
      writerName: '정선우',
      parentId: 12,
      reply: [],
    },
  ],
  createdAt: '2024-04-06T18:16:27',
  student: 'student',
  trainer: 'trainer 트레이너',
  lessonDt: '04월 01일 월요일',
  lessonTime: '10:00 - 11:00',
  attendanceStatus: '출석',
  fileUrl: [
    'https://to-be-healthy-bucket.s3.ap-northeast-2.amazonaws.com/images/health-image-1.png',
    'https://to-be-healthy-bucket.s3.ap-northeast-2.amazonaws.com/images/health-image-1.png',
    'https://to-be-healthy-bucket.s3.ap-northeast-2.amazonaws.com/images/invitation.png',
  ],
};
