'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
dayjs.locale('ko');

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useStudentLogListQuery } from '@/feature/log';
import { IconBack, IconCalendarX, IconChat, IconPlus } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout, MonthPicker } from '@/widget';
import { ImageSlide } from '@/widget/image-slide';

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
      <Layout.Contents className='overflow-y-hidden py-7'>
        <div className='px-7'>
          <MonthPicker
            date={selectedMonth}
            onChangeDate={(newDate) => setSelectedMonth(newDate)}
          />
        </div>
        {contents && contents.length > 0 && (
          <div className='mt-1 flex h-full flex-1 flex-grow flex-col overflow-y-auto px-7 pb-7'>
            <div className='flex w-full flex-col gap-y-6 pb-6'>
              {contents.length > 0 &&
                contents.map((log) => {
                  const date = dayjs(log.createdAt);
                  const formattedDate = date.format('M월 D일 (ddd)');
                  return (
                    <Link key={log.id} href={`${pathname}/${log.id}`}>
                      <Card className='w-full gap-0 px-6 py-7'>
                        <CardHeader className={cn(Typography.TITLE_3)}>
                          {formattedDate}
                          {` `}
                          {log.lessonTime}
                        </CardHeader>
                        <CardContent className='mt-4'>
                          <ImageSlide images={log.files} />
                          <p
                            className={cn(
                              Typography.BODY_3,
                              'mt-5 line-clamp-2 h-full overflow-ellipsis text-black'
                            )}>
                            {log.content}
                          </p>
                        </CardContent>
                        <CardFooter className='mt-6 flex items-center gap-2'>
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
          <div className='flex h-full flex-col items-center justify-center space-y-4'>
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
