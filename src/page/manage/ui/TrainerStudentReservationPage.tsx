'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import {
  TrainerStudentLastReservationSchedule,
  TrainerStudentReservationSchedule,
  useTrainerStudentLastReservationListQuery,
  useTrainerStudentReservationListQuery,
} from '@/feature/schedule';
import { IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { cn, twSelector } from '@/shared/utils';
import { Layout, MonthPicker } from '@/widget';

interface Props {
  memberId: number;
}

export const TrainerStudentReservationPage = ({ memberId }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState<Date>(today);

  const { data: UpcomingReservationData } =
    useTrainerStudentReservationListQuery(memberId);
  const { data: LastReservationData, isPending } =
    useTrainerStudentLastReservationListQuery({
      searchDate: dayjs(selectedMonth).format('YYYY-MM'),
      memberId,
    });

  const onChangeMonth = (month: Date) => {
    setSelectedMonth(month);
  };

  return (
    <Layout>
      <Layout.Header>
        <button onClick={() => router.back()}>
          <IconBack />
        </button>
        <h2
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 translate-x-[-50%] text-black'
          )}>
          {name && `${name}님 예약 내역`}
        </h2>
      </Layout.Header>
      <Layout.Contents className='p-7'>
        <Tabs defaultValue='upcomingReservation'>
          <TabsList className='mb-6 flex items-center justify-start gap-4 border-b-0 p-0'>
            <TabsTrigger
              value='upcomingReservation'
              className={cn(
                Typography.BODY_3,
                twSelector('data-[state=active]', Typography.HEADING_5),
                'w-fit rounded-full border-none bg-white px-5 py-[5px] text-gray-500',
                'data-[state=active]:bg-primary-500 data-[state=active]:text-white'
              )}>
              다가오는 예약
            </TabsTrigger>
            <TabsTrigger
              value='lastReservation'
              className={cn(
                Typography.BODY_3,
                twSelector('data-[state=active]', Typography.HEADING_5),
                'w-fit rounded-full border-none bg-white px-5 py-[5px] text-gray-500',
                'data-[state=active]:bg-primary-500 data-[state=active]:text-white'
              )}>
              지난 예약
            </TabsTrigger>
          </TabsList>
          <TabsContent value='upcomingReservation' className='w-full'>
            <ul>
              {UpcomingReservationData?.reservations ? (
                UpcomingReservationData?.reservations.map((item) => {
                  return (
                    <li key={item.scheduleId}>
                      <TrainerStudentReservationSchedule data={item} />
                    </li>
                  );
                })
              ) : (
                <TrainerStudentReservationSchedule data={null} />
              )}
            </ul>
          </TabsContent>
          <TabsContent value='lastReservation' className='w-full'>
            {selectedMonth && (
              <div className='flex justify-start'>
                <MonthPicker
                  date={selectedMonth}
                  onChangeDate={(newDate) => onChangeMonth(newDate)}
                />
              </div>
            )}
            {isPending ? (
              <div className='flex h-[500px] w-full items-center justify-center'>
                <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
              </div>
            ) : (
              <ul>
                {LastReservationData?.reservations ? (
                  LastReservationData?.reservations.map((item) => {
                    return (
                      <li key={item.scheduleId}>
                        <TrainerStudentLastReservationSchedule data={item} />
                      </li>
                    );
                  })
                ) : (
                  <TrainerStudentLastReservationSchedule data={null} />
                )}
              </ul>
            )}
          </TabsContent>
        </Tabs>
      </Layout.Contents>
    </Layout>
  );
};
