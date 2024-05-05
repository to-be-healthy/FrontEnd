'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
dayjs.locale('ko');
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useStudentLogListQuery } from '@/feature/log';
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
import { MonthPicker } from '@/shared/ui/month-picker';
import { cn } from '@/shared/utils';

interface Props {
  memberId: number;
}

const StudentLogPage = ({ memberId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchMonth, setSearchMonth] = useState<string>();

  const { data } = useStudentLogListQuery({
    studentId: memberId,
    ...(searchMonth && { searchMonth }),
  });

  const contents = data?.content;

  return (
    <Layout>
      {contents && (
        <>
          <Layout.Header>
            <Button variant='ghost' size='icon' onClick={() => router.back()}>
              <IconBack />
            </Button>
            <h2 className='typography-heading-4 font-semibold'>
              {data.studentName}님 수업 일지
            </h2>
            <Button variant='ghost' size='icon' asChild>
              <Link href={`/trainer/manage/${memberId}/log/write`}>
                <IconPlus fill='black' width={17} height={16} />
              </Link>
            </Button>
          </Layout.Header>
          <Layout.Contents className='overflow-y-hidden py-[20px]'>
            <div className='px-[20px]'>
              <MonthPicker
                date={searchMonth}
                onChangeDate={(newDate) => setSearchMonth(newDate)}
              />
            </div>
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
                            <p
                              className={cn(
                                Typography.BODY_3,
                                'px-[16px] py-[8px] text-black'
                              )}>
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
                {/* TODO - 수업 내역 없는 경우 화면 필요 */}
                {contents.length === 0 && <div>수업 내역이 없습니다.</div>}
              </div>
            </div>
          </Layout.Contents>
        </>
      )}
    </Layout>
  );
};

export { StudentLogPage };
