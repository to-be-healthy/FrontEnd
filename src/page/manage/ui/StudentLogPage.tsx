'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import Image from 'next/image';
dayjs.locale('ko');

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import IconBack from '@/shared/assets/images/icon_back.svg';
import IconChat from '@/shared/assets/images/icon_chat.svg';
import IconPlus from '@/shared/assets/images/icon_plus.svg';
import { Typography } from '@/shared/mixin';
import { Button, Card, CardContent, CardFooter, CardHeader, Layout } from '@/shared/ui';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNav,
} from '@/shared/ui/carousel';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { cn } from '@/shared/utils';

import { useStudentInfo } from '../hooks/useStudentInfo';

interface Props {
  memberId: number;
}

const StudentLogPage = ({ memberId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { memberInfo } = useStudentInfo(memberId);

  const [data] = useState(MOCK_DATA);

  return (
    <Layout>
      {memberInfo && (
        <>
          <Layout.Header>
            <Button variant='ghost' size='icon' onClick={() => router.back()}>
              <IconBack />
            </Button>
            <h2 className='typography-heading-4 font-semibold'>
              {memberInfo.name}님 수업 일지
            </h2>
            <Button variant='ghost' size='icon'>
              <IconPlus fill='black' width={17} height={16} fili='#000000' />
            </Button>
          </Layout.Header>
          <Layout.Contents className='overflow-y-hidden py-[20px]'>
            <div className='px-[20px]'>
              <Select defaultValue={'2023년 12월'}>
                <SelectTrigger className='flex w-fit items-center gap-x-[4px] bg-transparent'>
                  <SelectValue placeholder='헬스장 선택' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {['2023년 12월', '2024년 1월'].map((item) => (
                      <SelectItem key={item} value={String(item)}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='mt-[4px] flex h-full flex-1 flex-grow flex-col overflow-y-auto px-[20px] pb-[20px]'>
              <div className='flex w-full flex-col gap-y-[16px] pb-[16px]'>
                {data.map((item) => {
                  const date = dayjs(item.createdAt);
                  const formattedDate = date.format('M월 D일 (ddd)');
                  return (
                    <Link key={item.id} href={`${pathname}/${item.id}`}>
                      <Card className='w-full px-0'>
                        <CardHeader
                          className={cn(Typography.TITLE_3, 'px-[16px] text-gray-600')}>
                          {formattedDate}
                          {` `}
                          {item.lessonTime}
                        </CardHeader>
                        <CardContent className='px-[16px]'>
                          <Carousel className='mx-auto w-full' opts={{}}>
                            <CarouselContent className='mx-0 p-0'>
                              {item.fileUrl.map((file, index) => (
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
                          <p
                            className={cn(
                              Typography.BODY_3,
                              'px-[16px] py-[8px] text-black'
                            )}>
                            {item.content}
                          </p>
                        </CardContent>
                        <CardFooter className='flex items-center space-x-[6px] px-[16px]'>
                          <IconChat />
                          <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
                            댓글 <span>{item.comment.length}</span>
                          </p>
                        </CardFooter>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </Layout.Contents>
        </>
      )}
    </Layout>
  );
};

export { StudentLogPage };

const MOCK_DATA = [
  {
    id: 6,
    title: '내가 원하는 제목으로 바꾸자!',
    content: '내가 원하는 내용으로 바꾸자!',
    comment: [
      {
        id: 11,
        content: '내가 원하는 댓글 내용으로 바꾸겠음!',
        writer: 242,
        order: 1,
        parentId: null,
      },
      {
        id: 12,
        content: '네!! 화이팅입니다 ^^',
        writer: 243,
        order: 2,
        parentId: null,
      },
      {
        id: 13,
        content: '네네!! 잘 부탁드려요^^',
        writer: 242,
        order: 3,
        parentId: 12,
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
  },
];
