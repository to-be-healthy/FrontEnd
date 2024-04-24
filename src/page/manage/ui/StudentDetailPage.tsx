'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  CourseSheet,
  CourseSheetContent,
  CourseSheetFooter,
  CourseSheetHeader,
  CourseSheetInput,
  CourseSheetTrigger,
} from '@/feature/manage';
import {
  CourseCard,
  CourseCardContent,
  CourseCardHeader,
  useRegisterStudentCourseMutation,
  useStudentDetailQuery,
} from '@/feature/member';
import IconArrowRight from '@/shared/assets/images/icon_arrow_right.svg';
import IconBack from '@/shared/assets/images/icon_back.svg';
import IconCalendar from '@/shared/assets/images/icon_calendar_blue.svg';
import CheckIcon from '@/shared/assets/images/icon_check.svg';
import IconDefaultProfile from '@/shared/assets/images/icon_default_profile.svg';
import IconDotsVertical from '@/shared/assets/images/icon_dots_vertical.svg';
import IconDumbel from '@/shared/assets/images/icon_dumbel.svg';
import IconEdit from '@/shared/assets/images/icon_edit.svg';
import IconPhone from '@/shared/assets/images/icon_phone.svg';
import { Typography } from '@/shared/mixin';
import { Button, Card, CardContent, CardHeader, Layout, useToast } from '@/shared/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/shared/utils';

import { profileBorderStyleMapper } from '../utils';

interface Props {
  memberId: number;
}

const REMAIN_CNT_ZERO = 0;

export const StudentDetailPage = ({ memberId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data } = useStudentDetailQuery(memberId);
  const [isRegisterSheetOpen, setIsRegisterSheetOpen] = useState(false);
  const [RegisterInput, setRegisterInput] = useState('');
  const { mutate: RegisterMutation } = useRegisterStudentCourseMutation();
  const queryClient = useQueryClient();

  const RegisterCourseCount = () => {
    RegisterMutation(
      {
        memberId: memberId,
        lessonCnt: Number(RegisterInput),
      },
      {
        onSuccess: (reslut) => {
          setIsRegisterSheetOpen(false);
          void queryClient.invalidateQueries({
            queryKey: ['registeredStudent'],
          });
          return toast({
            className: 'h-12',
            description: (
              <div className='flex items-center justify-center'>
                <CheckIcon fill={'var(--primary-500)'} />
                <p className='typography-heading-5 ml-6 text-[#fff]'>{reslut.message}</p>
              </div>
            ),
            duration: 2000,
          });
        },
        onError: (error) => {
          return toast({
            className: 'h-12',
            description: (
              <div className='flex items-center justify-center'>
                <CheckIcon fill={'var(--primary-500)'} />
                <p className='typography-heading-5 ml-6 text-[#fff]'>
                  {error.response?.data.message}
                </p>
              </div>
            ),
            duration: 2000,
          });
        },
      }
    );
  };

  const deleteStudent = () => {
    console.log('Delete Member', memberId);
  };

  return (
    <Layout>
      <Layout.Header>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.replace('/trainer/manage')}>
          <IconBack />
        </Button>
        <h2 className={Typography.HEADING_4_SEMIBOLD}>회원 정보</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className={Typography.TITLE_1_SEMIBOLD}
              onClick={() => {
                console.log('open menu');
              }}>
              <IconDotsVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='absolute -right-5 top-0 flex w-[120px] flex-col bg-white'>
            <DropdownMenuGroup className='flex flex-col'>
              <DropdownMenuItem
                className='typography-title-3 px-[16px] py-[12px]'
                asChild>
                <Link
                  href={{
                    pathname: `/trainer/manage/${memberId}/edit`,
                    query: {
                      type: 'nickname',
                      name: data?.name,
                      nickname: data?.nickName,
                    },
                  }}>
                  별칭 설정
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className='typography-title-3 px-[16px] py-[12px]'
                onClick={deleteStudent}>
                회원 삭제
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Layout.Header>
      {data && (
        <Layout.Contents className='px-[20px]'>
          <div className='flex w-full items-center gap-x-[24px]  py-[24px]'>
            {data.fileUrl ? (
              <Image
                width={80}
                height={80}
                src={data.fileUrl}
                alt='profile'
                className={profileBorderStyleMapper(data.ranking)}
              />
            ) : (
              <IconDefaultProfile />
            )}
            <div className='flex flex-col'>
              <h2 className={cn('flex gap-x-[8px]', Typography.HEADING_2)}>
                {data.name}
                <IconPhone />
              </h2>
              <div
                className={cn(
                  Typography.BODY_3,
                  'flex items-center gap-x-[6px] text-gray-500'
                )}>
                {data.nickName && <p>{data.nickName}</p>}
                {data.ranking !== 999 && data.nickName && (
                  <div className='block h-[11px] w-[1px] bg-gray-300'></div>
                )}
                {data.ranking !== 999 && (
                  <p>
                    랭킹 <span className='text-primary-500'>{data.ranking}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='mb-[16px] flex items-center justify-center gap-x-[8px] '>
            <Card className='mb-[16px] flex w-full flex-row items-center justify-between gap-y-[28px] px-[24px] py-[12px] shadow-sm'>
              <Link
                href={'#'}
                className='flex flex-col items-center justify-between gap-y-[8px]'>
                <div className='flex h-[20px] items-center justify-center'>
                  <IconCalendar />
                </div>
                <p className={Typography.HEADING_5}>일정 등록</p>
              </Link>
              <div className='h-[36px] w-[1px] bg-gray-100' />
              <Link
                href={{
                  pathname: `/trainer/manage/${memberId}/edit`,
                  query: {
                    type: 'memo',
                    name: data?.name,
                  },
                }}
                className='flex flex-col items-center justify-between gap-y-[8px]'>
                <div className='flex h-[20px] items-center justify-center'>
                  <IconEdit />
                </div>
                <p className={Typography.HEADING_5}>회원 메모</p>
              </Link>
              <div className='h-[36px] w-[1px] bg-gray-100' />
              <Link
                href={'#'}
                className='flex flex-col items-center justify-between gap-y-[8px]'>
                <div className='flex h-[20px] items-center justify-center'>
                  <IconDumbel />
                </div>
                <p className={Typography.HEADING_5}>수업 일지</p>
              </Link>
            </Card>
          </div>

          {data?.course?.courseId ? (
            <Link
              href={{
                pathname: `/trainer/manage/${memberId}/course-detail`,
                query: { name: data?.name },
              }}>
              <CourseCard
                key={data?.course?.courseId}
                className={cn(
                  'mb-6 gap-y-11',
                  data?.course?.remainLessonCnt === REMAIN_CNT_ZERO && 'bg-gray-500'
                )}>
                <CourseCardHeader
                  remainLessonCnt={data?.course?.remainLessonCnt}
                  title={
                    data?.course?.remainLessonCnt === REMAIN_CNT_ZERO
                      ? `${data?.course?.totalLessonCnt}회 PT 수강`
                      : `잔여 ${data?.course?.remainLessonCnt}회`
                  }
                  indication={
                    data?.course?.remainLessonCnt === REMAIN_CNT_ZERO
                      ? '만료'
                      : 'PT 수강권'
                  }
                />
                <CourseCardContent
                  className={cn(
                    data?.course?.remainLessonCnt === REMAIN_CNT_ZERO && 'text-gray-300'
                  )}
                  progressClassName={cn(
                    data?.course?.remainLessonCnt === REMAIN_CNT_ZERO && 'bg-gray-400'
                  )}
                  totalLessonCnt={data?.course?.totalLessonCnt}
                  remainLessonCnt={data?.course?.remainLessonCnt}
                />
              </CourseCard>
            </Link>
          ) : (
            <Card className='mb-6 flex w-full items-center justify-center bg-gray-500 py-[32px]'>
              <p className={cn('mb-2 text-[#fff]', Typography.TITLE_3)}>
                등록된 수강권이 없습니다.
              </p>
              <CourseSheet
                isOpen={isRegisterSheetOpen}
                setIsOpen={setIsRegisterSheetOpen}>
                <CourseSheetTrigger
                  className={cn(
                    'flex h-[37px] w-[112px] items-center justify-center rounded-[9999px] border border-[#fff] bg-gray-500 text-[#fff]',
                    Typography.TITLE_3
                  )}>
                  수강권 등록
                </CourseSheetTrigger>
                <CourseSheetContent>
                  <CourseSheetHeader>등록할 수업횟수</CourseSheetHeader>
                  <CourseSheetInput
                    courseInput={RegisterInput}
                    setCourseInput={setRegisterInput}
                    isOpen={isRegisterSheetOpen}
                  />
                  <CourseSheetFooter
                    courseInput={RegisterInput}
                    clickButtonHandler={RegisterCourseCount}>
                    수강권 등록
                  </CourseSheetFooter>
                </CourseSheetContent>
              </CourseSheet>
            </Card>
          )}

          {data.lessonDt && data.lessonStartTime ? (
            <Card className='mb-[16px] w-full gap-y-[24px] px-[16px] py-[20px] shadow-sm'>
              <CardHeader className='flex items-center justify-between text-gray-800'>
                <h4 className={cn(Typography.TITLE_2, 'text-gray-800')}>다음 PT예정일</h4>
                <Link href='#'>
                  <p className={cn(Typography.BODY_3, 'text-gray-500')}>예약 전체</p>
                </Link>
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    Typography.HEADING_4,
                    'flex items-center gap-x-[8px] text-black'
                  )}>
                  <IconPhone />
                  {/* TODO) 날짜, 시간 포매터 추가 */}
                  {data.lessonDt} {data.lessonStartTime}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className='mb-[16px] w-full gap-y-[24px] px-[16px] py-[20px] shadow-sm'>
              <CardHeader className='flex items-center justify-between text-gray-800'>
                <h4 className={cn(Typography.TITLE_2, 'text-gray-800')}>
                  예약 내역
                  <span className={cn(Typography.BODY_3, 'ml-[10px] text-gray-600')}>
                    예정된 수업이 없습니다.
                  </span>
                </h4>
                <Link href='#'>
                  <IconArrowRight />
                </Link>
              </CardHeader>
            </Card>
          )}
          {data.diet !== null ? (
            <Card className='mb-[16px] w-full gap-y-[12px] px-[16px] py-[20px] shadow-sm'>
              <CardHeader className='flex items-center justify-between text-gray-800'>
                <h4 className={cn(Typography.TITLE_2, 'text-gray-800')}>오늘 식단</h4>
                <Link href='#'>
                  <p className={cn(Typography.BODY_3, 'text-gray-500')}>등록 식단 전체</p>
                </Link>
              </CardHeader>
              <CardContent className='flex justify-center gap-x-[6px]'>
                <div className='h-[95px] w-[95px] bg-gray-300'></div>
                <div className='h-[95px] w-[95px] bg-gray-300'></div>
                <div className='h-[95px] w-[95px] bg-gray-300'></div>
              </CardContent>
            </Card>
          ) : (
            <Card className='mb-[16px] w-full gap-y-[12px] px-[16px] py-[20px] shadow-sm'>
              <CardHeader className='flex items-center justify-between text-gray-800'>
                <h4 className={cn(Typography.TITLE_2, 'text-gray-800')}>
                  오늘 식단
                  <span className={cn(Typography.BODY_3, 'ml-[10px] text-gray-600')}>
                    오늘 등록된 식단이 없습니다.
                  </span>
                </h4>
                <Link href='#'>
                  <IconArrowRight />
                </Link>
              </CardHeader>
            </Card>
          )}
          <Card className='w-full gap-y-[12px] px-[16px] py-[20px] shadow-sm'>
            <CardHeader className='flex items-center justify-between'>
              <h4 className={cn(Typography.TITLE_2, 'text-gray-800')}>개인 운동 기록</h4>
              <Link href='#'>
                <IconArrowRight />
              </Link>
            </CardHeader>
          </Card>
        </Layout.Contents>
      )}
    </Layout>
  );
};
