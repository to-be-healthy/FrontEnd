'use client';

import 'dayjs/locale/ko';
dayjs.locale('ko');
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useStudentHomeDataQuery } from '@/feature/member';
import {
  IconAlarm,
  IconArrowDown,
  IconArrowFilledDown,
  IconArrowFilledUp,
  IconAvatar,
  IconCheck,
  IconLogo,
  IconPlus,
  IconPoint,
} from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Layout,
  Progress,
} from '@/shared/ui';
import { cn } from '@/shared/utils';

const FEEDBACK_COUNT = 1;

export const StudentHomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending } = useStudentHomeDataQuery();

  const toggleArrow = () => {
    setIsOpen((prev) => !prev);
  };

  const nextScheduledDay = data?.myReservation
    ? dayjs(data?.myReservation?.lessonDt).format('MM.DD (ddd)')
    : '';
  const nextScheduledHour = data?.myReservation
    ? dayjs(data?.myReservation?.lessonStartTime, 'HH:mm:ss').format('A hh:mm')
    : '';

  interface bb {
    fast: boolean;
    id?: number;
    dietId?: number;
    fileUrl?: string;
    type?: string;
  }
  interface aa {
    breackFast: bb;
    lunch: bb;
    dinner: bb;
  }
  const abc: aa = {
    breackFast: {
      fast: true,
      id: 50,
      dietId: 30,
      fileUrl:
        'https://to-be-healthy-bucket.s3.ap-northeast-2.amazonaws.com/diet/1715833489243-8e1ac6d4-cf33-423f-a3db-ab4409bcd9ef.jpg',
      type: 'breackFast',
    },

    lunch: {
      fast: false,
    },

    dinner: {
      fast: false,
      id: 50,
      dietId: 30,
      fileUrl:
        'https://to-be-healthy-bucket.s3.ap-northeast-2.amazonaws.com/diet/1715833489243-8e1ac6d4-cf33-423f-a3db-ab4409bcd9ef.jpg',
      type: 'LUNCH',
    },
  };
  return (
    <Layout type='student'>
      <Layout.Header>
        <IconLogo width='44px' height='44px' />
        <Link href='#'>
          <IconAlarm />
        </Link>
      </Layout.Header>
      <Layout.Contents className='p-7 pt-6'>
        {isPending ? (
          <span>로딩중...</span>
        ) : (
          <>
            <article className='mb-7'>
              <Card className='w-full gap-y-7 bg-primary-500 p-0'>
                <CardHeader>
                  <Link
                    href='./student/course-history'
                    className='block px-6 pb-0 pt-7 text-white'>
                    <div
                      className={cn(
                        Typography.BODY_4,
                        'mb-1 flex items-center justify-between text-[#E2F1FF]'
                      )}>
                      <p>{data?.gym.name}</p>
                      <span>{`PT ${data?.course.totalLessonCnt}회 수강권`}</span>
                    </div>
                    <p className={cn(Typography.HEADING_3, 'mb-8')}>
                      {`${data?.course.remainLessonCnt}회 남아있어요!`}
                    </p>

                    <div>
                      <p className={cn(Typography.HEADING_5, 'mb-[6px]')}>
                        {`PT 진행 횟수 ${data?.course && data?.course.totalLessonCnt - data?.course.remainLessonCnt}`}
                        <span className={cn(Typography.BODY_3, 'text-[#8EC7FF]')}>
                          /{data?.course.totalLessonCnt}
                        </span>
                      </p>
                      <Progress
                        className='h-[2px]'
                        value={
                          (((data?.course?.totalLessonCnt ?? 0) -
                            (data?.course?.remainLessonCnt ?? 0)) /
                            (data?.course?.totalLessonCnt ?? 0)) *
                          100
                        }
                      />
                    </div>
                  </Link>
                </CardHeader>
                <CardContent>
                  {/* todo: 만료되었을때 안펼쳐지게 */}
                  <Collapsible className='rounded-bl-lg rounded-br-lg bg-primary-600'>
                    <CollapsibleTrigger
                      className='w-full text-white'
                      onClick={toggleArrow}>
                      <div className='flex items-center justify-between p-6'>
                        <p className={cn(Typography.HEADING_5)}>
                          {data?.point.searchDate.split('-')[1].split('')[1]}월 활동
                          포인트
                        </p>
                        <div
                          className={cn(
                            Typography.TITLE_1,
                            'flex items-center justify-center'
                          )}>
                          {isOpen ? (
                            <IconArrowDown
                              widht={14}
                              height={14}
                              className='rotate-180'
                            />
                          ) : (
                            <>
                              <p className='mr-2 flex items-center justify-center'>
                                <IconPoint />
                                <span className='ml-[3px]'>{data?.point.monthPoint}</span>
                              </p>
                              <IconArrowDown widht={14} height={14} />
                            </>
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='p-6 pt-3'>
                      <ul className='flex'>
                        <li className='w-[130px]'>
                          <Link href='./student/point-history'>
                            <Card className='h-full w-full gap-y-7 p-6'>
                              <CardHeader>
                                <p
                                  className={cn(
                                    Typography.HEADING_5,
                                    'flex items-center justify-start text-black'
                                  )}>
                                  <IconPoint />
                                  이번달 포인트
                                </p>
                              </CardHeader>
                              <CardContent>
                                <p
                                  className={cn(
                                    Typography.HEADING_2,
                                    'mb-7 flex items-center text-black'
                                  )}>
                                  {data?.point.monthPoint}
                                  <span
                                    className={cn(
                                      Typography.HEADING_5,
                                      'ml-[2px] text-gray-700'
                                    )}>
                                    점
                                  </span>
                                </p>
                                <span className={cn(Typography.BODY_4, 'text-gray-400')}>
                                  누적 {data?.point.totalPoint}
                                </span>
                              </CardContent>
                            </Card>
                          </Link>
                        </li>
                        <li className='ml-3 w-[130px]'>
                          <Card className='h-full w-full gap-y-7 p-6'>
                            <CardHeader>
                              <p
                                className={cn(
                                  Typography.HEADING_5,
                                  'flex items-center justify-start text-black'
                                )}>
                                랭킹
                              </p>
                            </CardHeader>
                            <CardContent>
                              <p
                                className={cn(
                                  Typography.HEADING_2,
                                  'mb-7 flex items-center text-black'
                                )}>
                                {data?.rank.ranking}
                                <span
                                  className={cn(
                                    Typography.HEADING_5,
                                    'ml-[2px] mr-1 text-gray-700'
                                  )}>
                                  위
                                </span>
                                {data?.rank?.ranking === data?.rank?.lastMonthRanking ? (
                                  ''
                                ) : data?.rank &&
                                  data?.rank.ranking > data?.rank.lastMonthRanking ? (
                                  <IconArrowFilledDown fill='var(--primary-500)' />
                                ) : (
                                  <IconArrowFilledUp fill='var(--point-color)' />
                                )}
                              </p>
                              <span className={cn(Typography.BODY_4, 'text-gray-400')}>
                                총 {data?.rank.totalMemberCnt}명
                              </span>
                            </CardContent>
                          </Card>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </article>

            {data?.myReservation && (
              <article className='mb-7'>
                <Card className='w-full gap-y-8 px-6 py-7'>
                  <CardHeader className='flex items-center justify-between'>
                    <h2 className={cn(Typography.TITLE_2, 'text-gray-800')}>
                      다음 PT예정일
                    </h2>
                    <Link href='/' className={cn(Typography.BODY_3, 'gray-500 h-auto')}>
                      예약전체
                    </Link>
                  </CardHeader>
                  <CardContent className='flex items-center justify-start'>
                    <IconCheck fill={'var(--primary-500)'} />
                    <p className={cn(Typography.HEADING_4_BOLD, 'ml-3 text-black')}>
                      {nextScheduledDay} {nextScheduledHour}
                    </p>
                  </CardContent>
                </Card>
              </article>
            )}

            {data?.lessonHistory && (
              <article className='mb-7'>
                <Card className='w-full gap-y-8 px-6 py-7'>
                  <CardHeader className='flex items-center justify-between'>
                    <h2 className={cn(Typography.TITLE_1_BOLD, 'text-black')}>
                      수업 일지
                      <span
                        className={cn(
                          Typography.HEADING_5,
                          'ml-1 inline-block h-7 w-7 rounded-[50%] bg-primary-500 text-center text-[#fff]'
                        )}>
                        {FEEDBACK_COUNT}
                        {/* todo: 수업 전체에 들어가서 보는순간 없어짐..? */}
                      </span>
                    </h2>
                    <Link href='/' className={cn(Typography.BODY_3, 'gray-500 h-auto')}>
                      수업전체
                    </Link>
                  </CardHeader>
                  <CardContent className='flex items-start justify-start'>
                    <IconAvatar width={28} height={28} />
                    <div className='ml-2 w-full overflow-hidden rounded-lg rounded-tl-none bg-gray-100 p-6'>
                      <p className={cn(Typography.BODY_4, 'line-clamp-2 text-black')}>
                        {data?.lessonHistory.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </article>
            )}

            <article className='mb-7'>
              <Card className='w-full gap-y-8 px-6 py-7'>
                <CardHeader className='flex items-center justify-between'>
                  <h2 className={cn(Typography.TITLE_1_BOLD, 'text-black')}>오늘 식단</h2>
                  <Link href='/' className={cn(Typography.BODY_3, 'gray-500 h-auto')}>
                    식단전체
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center justify-between'>
                    {/* 식단 post -> response : url, 이미지 용량 체크, 컴포넌트분리 */}
                    {abc?.breackFast?.fast ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <div className='h-full min-h-[95px] w-full rounded-md bg-gray-100'></div>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--primary-500)'} />
                          </span>
                        </Button>
                      </div>
                    ) : abc?.breackFast.fileUrl ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <Image
                          src={abc?.breackFast.fileUrl}
                          width={60}
                          height={60}
                          alt='breackfast'
                          className='custom-image flex items-center justify-center rounded-md'
                        />
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    ) : (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <button className='flex h-[95px] w-full items-center justify-center rounded-md bg-gray-100'>
                          <IconPlus width={20} height={20} fill={'var(--gray-500)'} />
                        </button>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    )}

                    {abc?.lunch?.fast ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <div className='h-[95px] w-full rounded-md bg-gray-100'></div>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--primary-500)'} />
                          </span>
                        </Button>
                      </div>
                    ) : abc?.lunch.fileUrl ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <Image
                          src={abc.lunch.fileUrl ?? ''}
                          width={60}
                          height={95}
                          alt='lunch'
                          className='custom-image flex items-center justify-center rounded-md'
                        />
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    ) : (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <Button
                          variant='ghost'
                          className='flex min-h-[95px] w-full items-center justify-center rounded-md bg-gray-100'>
                          <IconPlus width={20} height={20} fill={'var(--gray-500)'} />
                        </Button>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    )}

                    {abc?.dinner?.fast ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <div className='h-[95px] w-full rounded-md bg-gray-100'></div>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--primary-500)'} />
                          </span>
                        </Button>
                      </div>
                    ) : abc?.dinner.fileUrl ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <Image
                          src={abc.dinner.fileUrl ?? ''}
                          width={60}
                          height={60}
                          alt='dinner'
                          className='custom-image flex items-center justify-center rounded-md'
                        />
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    ) : (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <button className='flex h-[95px] w-full items-center justify-center rounded-md bg-gray-100'>
                          <IconPlus width={20} height={20} fill={'var(--gray-500)'} />
                        </button>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </article>

            <article>
              <Card className='w-full gap-y-8 px-6 py-7'>
                <CardHeader className='flex items-center justify-between'>
                  <h2 className={cn(Typography.TITLE_1_BOLD, 'text-black')}>
                    개인 운동 기록
                  </h2>
                  <Link href='/' className={cn(Typography.BODY_3, 'gray-500 h-auto')}>
                    ㄴㅇㄹ
                  </Link>
                </CardHeader>
                <CardContent>ㄴㄹㄴㅇㄹ</CardContent>
              </Card>
            </article>
          </>
        )}
      </Layout.Contents>
    </Layout>
  );
};
