'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { useAddStudentCourseMutation, useMyInfoQuery } from '@/feature/member';
import { IconAlarmWhite, IconMedalGold, IconPlus } from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { FLEX_CENTER, Typography } from '@/shared/mixin';
import { Button, Card, CardContent, CardHeader } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

import { useTrainerHomeQuery } from '../api/useTrainerHomeQuery';

export const TrainerHomePage = () => {
  const queryClient = useQueryClient();
  const { showErrorToast } = useShowErrorToast();
  const { mutate } = useAddStudentCourseMutation();
  const { data: userInfo } = useMyInfoQuery();
  const { data: homeInfo } = useTrainerHomeQuery();

  const addCourse = ({ courseId, memberId }: { courseId: number; memberId: number }) => {
    mutate(
      {
        courseId,
        memberId,
        calculation: 'PLUS',
        type: 'PLUS_CNT',
        updateCnt: '1',
      },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({
            queryKey: ['TrainerHome'],
          });
        },
        onError: (error) => {
          const message = error?.response?.data.message ?? '문제가 발생했습니다.';
          showErrorToast(message);
        },
      }
    );
  };

  const hasTodaySchedule =
    homeInfo?.todaySchedule && homeInfo.todaySchedule.before.length > 0;

  return (
    <Layout type='trainer' className='relative'>
      <div className='absolute left-0 top-0 z-0 h-[150px] w-full bg-primary' />
      <Layout.Header className='z-10'>
        <p className={cn(Typography.TITLE_2, 'text-white')}>{userInfo?.gym.name}</p>
        <Link href={'#'}>
          <IconAlarmWhite />
        </Link>
      </Layout.Header>
      <Layout.Contents>
        <div className=' flex w-full flex-col gap-y-5 py-6'>
          <h3
            className={cn(
              Typography.HEADING_4_BOLD,
              'z-10 flex gap-x-2 px-7 text-white'
            )}>
            오늘의 수업
          </h3>
          {/* TODO) 오늘 스케줄 없을 경우 디자인 필요 */}
          {hasTodaySchedule && (
            <div className='hide-scrollbar z-10 overflow-x-auto'>
              <div className='flex w-fit gap-4'>
                {homeInfo?.todaySchedule.before.map((item) => {
                  return (
                    <Link href={'#'} key={item.scheduleId}>
                      <div
                        className={cn(
                          FLEX_CENTER,
                          'h-[100px] w-[100px] flex-col gap-1 rounded-md border border-gray-200 bg-white p-8 first:ml-7 last:mr-7'
                        )}>
                        <span className={cn(Typography.BODY_2, 'text-gray-500')}>
                          {item.lessonStartTime}
                        </span>
                        <p className={cn(Typography.TITLE_1_BOLD)}>
                          {item.applicantName}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className='mt-[19px] flex flex-col items-center px-[20px]'>
          <div className='grid w-full grid-cols-2 gap-2'>
            <Link href={'/trainer/manage'}>
              <Card className='h-[140px] w-full'>
                <CardHeader className='relative'>
                  회원
                  <span className='ml-1 text-primary-500'>{homeInfo?.studentCount}</span>
                  <div className='absolute right-0 top-0'>
                    <IconPlus width={20} fill={'#CBCFD3'} />
                  </div>
                </CardHeader>
                <CardContent className='relative h-full'>
                  <p>{`간편한 회원 관리와\n운동 일지 공유`}</p>
                  <div className='absolute bottom-0 right-0 h-[60px] w-[60px]'>
                    <Image
                      src='/images/icon_profile_coin_shadow.png'
                      fill
                      sizes='auto'
                      priority
                      alt='Card image of account'
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href={'#'}>
              <Card className='h-[140px] w-full'>
                <CardHeader>피드백 작성</CardHeader>
                <CardContent className='relative h-full'>
                  <p>{`수업 내역 관리와\n피드백 작성`}</p>
                  <div className='absolute bottom-0 right-0 h-[60px] w-[60px]'>
                    <Image
                      src='/images/icon_calendar_shadow.png'
                      fill
                      sizes='auto'
                      alt='Calendar image for classes'
                      priority
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          {/* TODO) 여러명일 때 화면 필요 */}
          {homeInfo?.bestStudents &&
            homeInfo?.bestStudents.length > 0 &&
            homeInfo?.bestStudents.map((item) => (
              <Card
                key={item.memberId}
                className='mt-6 flex h-fit w-full flex-row items-center justify-between'
                onClick={() =>
                  addCourse({
                    courseId: item.courseId,
                    memberId: item.memberId,
                  })
                }>
                <div className='flex items-center gap-3'>
                  <div className='relative w-fit'>
                    <IconMedalGold />
                    <span
                      className={cn(
                        Typography.HEADING_5,
                        'absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-white'
                      )}>
                      1
                    </span>
                  </div>
                  <div>
                    <p className={cn(Typography.BODY_3, 'text-gray-600')}>
                      {new Date().getMonth() + 1}월의 우수 회원
                    </p>
                    <p className={cn(Typography.TITLE_2)}>{item.name}</p>
                  </div>
                </div>
                <Button variant='secondary'>수강권 지급</Button>
              </Card>
            ))}
        </div>
      </Layout.Contents>
    </Layout>
  );
};
