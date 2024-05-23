'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
dayjs.locale('ko');

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useStudentLogListQuery } from '@/feature/log';
import { IconBack, IconCalendarX, IconChat, IconPlus } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNav,
} from '@/shared/ui/carousel';
import { cn } from '@/shared/utils';
import { Layout, MonthPicker } from '@/widget';

interface Props {
  memberId: number;
}

const StudentLogPage = ({ memberId }: Props) => {
  const pathname = usePathname();
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const { data } = useStudentLogListQuery({
    studentId: memberId,
    searchDate: dayjs(selectedMonth).format('YYYY-MM'),
  });

  const contents = data?.content;

  return (
    <Layout>
      <Layout.Header>
        <Link href={`/trainer/manage/${memberId}`}>
          <IconBack />
        </Link>
        <h2 className={cn(Typography.HEADING_4_SEMIBOLD)}>
          {contents && data.studentName}님 수업 일지
        </h2>
        <Link href={`/trainer/manage/${memberId}/log/write`}>
          <IconPlus fill='black' width={20} height={20} />
        </Link>
      </Layout.Header>
      <Layout.Contents className='overflow-y-hidden py-[20px]'>
        <div className='px-[20px]'>
          <MonthPicker
            date={selectedMonth}
            onChangeDate={(newDate) => setSelectedMonth(newDate)}
          />
        </div>
        {contents && contents.length > 0 && (
          <div className='mt-[4px] flex h-full flex-1 flex-grow flex-col overflow-y-auto px-[20px] pb-[20px]'>
            <div className='flex w-full flex-col gap-y-[16px] pb-[16px]'>
              {contents.length > 0 &&
                contents.map((log) => {
                  const date = dayjs(log.createdAt);
                  const formattedDate = date.format('M월 D일 (ddd)');
                  return (
                    <Link key={log.id} href={`${pathname}/${log.id}`}>
                      <Card className='w-full px-0'>
                        <CardHeader
                          className={cn(Typography.TITLE_3, 'px-[16px] text-gray-600')}>
                          {formattedDate}
                          {` `}
                          {log.lessonTime}
                        </CardHeader>
                        <CardContent className='px-[16px]'>
                          <Carousel className='mx-auto w-full' opts={{}}>
                            <CarouselContent className='mx-0 p-0'>
                              {log.files.map((file, index) => (
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
                          <p className={cn(Typography.BODY_3, 'py-[8px] text-black')}>
                            {log.content}
                          </p>
                        </CardContent>
                        <CardFooter className='flex items-center space-x-[6px] px-[16px]'>
                          <IconChat />
                          <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
                            댓글 <span>{log.commentTotalCount}</span>
                          </p>
                        </CardFooter>
                      </Card>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
        {contents && contents.length === 0 && (
          <div className='flex h-full flex-col items-center justify-center space-y-[10px]'>
            <IconCalendarX />
            <p className={cn(Typography.HEADING_4_SEMIBOLD, 'text-gray-400')}>
              수업일지 내역이 없습니다.
            </p>
          </div>
        )}
      </Layout.Contents>
    </Layout>
  );
};

export { StudentLogPage };
