'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { useHomeAlarmQuery } from '@/entity/alarm';
import {
  AddStudentDialog,
  useAddStudentCourseMutation,
  useMyInfoQuery,
} from '@/feature/member';
import { IconAlarmWhite, IconCalendarX, IconMedalGold, IconPlus } from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { FLEX_CENTER, Typography } from '@/shared/mixin';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

import { useTrainerHomeQuery } from '../api/useTrainerHomeQuery';

export const TrainerHomePage = () => {
  const queryClient = useQueryClient();
  const { showErrorToast } = useShowErrorToast();
  const { mutate } = useAddStudentCourseMutation();

  const { data: userInfo } = useMyInfoQuery();
  const { data: homeInfo } = useTrainerHomeQuery();
  const { data: homeAlarmData } = useHomeAlarmQuery();

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
    homeInfo?.todaySchedule &&
    (homeInfo.todaySchedule.before.length > 0 || homeInfo.todaySchedule.after.length > 0);

  return (
    <Layout type='trainer' className='relative'>
      <div className='absolute left-0 top-0 z-0 h-[170px] w-full bg-primary' />
      <Layout.Header className='z-10'>
        <p className={cn(Typography.TITLE_2, 'text-white')}>{userInfo?.gym.name}</p>
        <Link href={'/trainer/alarm'} className='relative'>
          <span
            className={
              homeAlarmData
                ? 't-0 absolute -right-[2px] h-1 w-1 rounded-full bg-point'
                : ''
            }
          />
          <IconAlarmWhite />
        </Link>
      </Layout.Header>
      {userInfo && homeInfo && (
        <Layout.Contents>
          <div className=' flex w-full flex-col gap-y-5 pb-10 pt-8'>
            <h3
              className={cn(
                Typography.HEADING_4_BOLD,
                'z-10 flex gap-x-2 px-7 text-white'
              )}>
              오늘의 수업
            </h3>
            {hasTodaySchedule && (
              <div className='hide-scrollbar z-10 overflow-x-auto'>
                <div className='flex w-fit gap-0 px-7'>
                  {homeInfo?.todaySchedule.before.map((item) => {
                    return (
                      <Link
                        href={`/trainer/manage/${item.applicantId}`}
                        key={item.scheduleId}>
                        <div
                          className={cn(
                            FLEX_CENTER,
                            'mr-4 h-[100px] w-[100px] flex-col gap-4 rounded-md border border-gray-200 bg-white p-8 shadow-sm'
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
                  {homeInfo.todaySchedule.after.map((item) => {
                    return (
                      <Link
                        href={`/trainer/manage/${item.applicantId}`}
                        key={item.scheduleId}>
                        <div
                          className={cn(
                            FLEX_CENTER,
                            'mr-4 h-[100px] w-[100px] flex-col gap-4 rounded-md border border-gray-200 bg-white p-8 shadow-sm'
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
            {!hasTodaySchedule && (
              <div className='px-7'>
                <Card className={cn(FLEX_CENTER, 'h-[100px] w-full gap-1 shadow-sm')}>
                  <IconCalendarX width={42} />
                  <p className={cn(Typography.HEADING_5, 'text-gray-500')}>
                    예약된 수업이 없습니다.
                  </p>
                </Card>
              </div>
            )}
          </div>
          <div className='mt-[19px] flex flex-col items-center px-[20px]'>
            <div className='grid w-full grid-cols-2 gap-2'>
              <Link href={'/trainer/manage'}>
                <Card className='h-[140px] w-full shadow-sm'>
                  <CardHeader className='relative'>
                    회원
                    <span className='ml-1 text-primary-500'>
                      {homeInfo?.studentCount}
                    </span>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                      }}>
                      <AddStudentDialog>
                        <button className='absolute right-0 top-0'>
                          <IconPlus width={20} fill={'#CBCFD3'} />
                        </button>
                      </AddStudentDialog>
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
              <Link href={'/trainer/manage/feedback'}>
                <Card className='h-[140px] w-full shadow-sm'>
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
            {homeInfo?.bestStudents && homeInfo.bestStudents.length > 0 && (
              <Card className='shaodw-none mt-6 flex w-full flex-col gap-6'>
                {homeInfo?.bestStudents.map((item) => (
                  <div
                    key={item.memberId}
                    className='flex h-fit w-full flex-row items-center justify-between'>
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
                        <Link href={`/trainer/manage/${item.memberId}`}>
                          <span className={cn(Typography.TITLE_2)}>{item.name}</span>
                        </Link>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant='secondary'>수강권 지급</Button>
                      </DialogTrigger>
                      <DialogContent className='flex w-[320px] flex-col rounded-md bg-white px-7 py-8'>
                        <h3 className={cn(Typography.HEADING_4_BOLD)}>
                          {item.name}님에게 1회 수강권 지급
                        </h3>
                        <p className={cn(Typography.BODY_1, 'mt-3 text-gray-600')}>
                          우수회원 수강권 지급은 한달에 1번 가능합니다. 추가 지급은 수강권
                          횟수 추가를 이용해주세요.
                        </p>
                        <div className='mt-8 flex w-full gap-3'>
                          <DialogClose asChild>
                            <Button
                              variant='secondary'
                              size='full'
                              className={cn(Typography.TITLE_1_SEMIBOLD, 'py-4')}>
                              아니요
                            </Button>
                          </DialogClose>
                          <Button
                            variant='default'
                            size='full'
                            className={cn(Typography.TITLE_1_SEMIBOLD, 'py-4')}
                            onClick={() =>
                              addCourse({
                                courseId: item.courseId,
                                memberId: item.memberId,
                              })
                            }>
                            예
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </Card>
            )}
          </div>
        </Layout.Contents>
      )}
    </Layout>
  );
};
