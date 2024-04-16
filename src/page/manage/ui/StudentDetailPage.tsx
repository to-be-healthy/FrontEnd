'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useStudentDetailQuery } from '@/feature/member';
import IconBack from '@/shared/assets/images/icon_back.svg';
import IconCalendar from '@/shared/assets/images/icon_calendar_blue.svg';
import IconDefaultProfile from '@/shared/assets/images/icon_default_profile.svg';
import IconDumbel from '@/shared/assets/images/icon_dumbel.svg';
import IconEdit from '@/shared/assets/images/icon_edit.svg';
import IconPhone from '@/shared/assets/images/icon_phone.svg';
import { Typography } from '@/shared/mixin';
import { Button, Card, CardContent, CardHeader, Layout, Progress } from '@/shared/ui';
import { cn } from '@/shared/utils';

import { profileBorderStyleMapper } from '../utils';

interface Props {
  memberId: number;
}

export const StudentDetailPage = ({ memberId }: Props) => {
  const router = useRouter();
  const { data } = useStudentDetailQuery(memberId);

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
        <Link
          href={`/trainer/manage/${memberId}/edit`}
          className={Typography.TITLE_1_SEMIBOLD}>
          수정
        </Link>
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
                href={'#'}
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
          <Card className='mb-[16px] w-full gap-y-[36px] bg-primary-500 text-white shadow-sm'>
            <CardHeader className='flex justify-between'>
              <p className={Typography.HEADING_4_SEMIBOLD}>
                잔여 <span className='font-bold'>{data.remainLessonCnt}</span>회
              </p>
              <p className={Typography.BODY_3}>{`PT ${data.lessonCnt}회 수강권`}</p>
            </CardHeader>
            <CardContent className='flex flex-col gap-y-[8px]'>
              <p className={cn(Typography.HEADING_5, 'text-white')}>
                PT 진행 횟수 {data.lessonCnt - data.remainLessonCnt}
                <span className='text-blue-200'>/{data.lessonCnt}</span>
              </p>
              <Progress
                value={(100 * (data.lessonCnt - data.remainLessonCnt)) / data.lessonCnt}
              />
            </CardContent>
          </Card>
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
          <Card className='w-full gap-y-[12px] px-[16px] py-[20px] shadow-sm'>
            <CardHeader>
              <h4 className={cn(Typography.TITLE_2, 'text-gray-800')}>개인 운동 기록</h4>
            </CardHeader>
          </Card>
        </Layout.Contents>
      )}
    </Layout>
  );
};
