'use client';

import Image from 'next/image';
import Link from 'next/link';

import IconAlarm from '@/shared/assets/images/icon_alarm.svg';
import ArrowDownIcon from '@/shared/assets/images/icon_arrow_down.svg';
import IconArrowUpFull from '@/shared/assets/images/icon_arrow_up_full.svg';
import CheckIcon from '@/shared/assets/images/icon_check.svg';
import PlusIcon from '@/shared/assets/images/icon_plus.svg';
import PointIcon from '@/shared/assets/images/icon_point.svg';
import Logo from '@/shared/assets/images/logo.svg';
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

const dietData = [
  {
    image: '',
    fasting: false,
  },
  {
    image: '',
    fasting: true,
  },
  {
    image:
      'https://to-be-healthy-bucket.s3.ap-northeast-2.amazonaws.com/images/invitation.png',
    fasting: false,
  },
];

const FEEDBACK_COUNT = 1;
export const StudentHomePage = () => {
  return (
    <Layout type='student'>
      <Layout.Header>
        <Logo width='44px' height='44px' />
        <Button variant='ghost'>
          <IconAlarm />
        </Button>
      </Layout.Header>
      <Layout.Contents className='p-7 pt-6'>
        <div className='mb-7'>
          <Card className='w-full gap-y-7 bg-primary-500 p-0'>
            <CardHeader>
              <Link
                href='./student/course-history'
                className='block px-6 pb-0 pt-7 text-white'>
                <div className='typography-body-4 mb-1 flex items-center justify-between text-[#E2F1FF]'>
                  <p>건강해짐 홍대점</p>
                  <span>PT 수강권</span>
                </div>
                <p className='typography-heading-3 mb-8'>4회 남아있어요!</p>

                <div>
                  <p className='typography-heading-5 mb-[6px]'>
                    PT 진행 횟수 6
                    <span className='typography-body-3 text-[#8EC7FF]'>/10</span>
                  </p>
                  <Progress className='h-[2px]' value={60} />
                </div>
              </Link>
            </CardHeader>
            <CardContent>
              <Collapsible className='rounded-bl-lg rounded-br-lg bg-primary-600'>
                <CollapsibleTrigger className='w-full text-white'>
                  <div className='flex items-center justify-between p-6'>
                    <p className='typography-heading-5'>4월 활동 포인트</p>
                    <div className='typography-title-1 flex items-center justify-center'>
                      <p className='mr-2 flex items-center justify-center'>
                        <PointIcon />
                        <span className='ml-[3px]'>16</span>
                      </p>
                      <ArrowDownIcon widht={14} height={14} />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className='p-6 pt-3'>
                  <ul className='flex'>
                    <li className='w-[130px]'>
                      <Card className='h-full w-full gap-y-7 p-6'>
                        <CardHeader>
                          <p className='typography-heading-5 flex items-center justify-start text-[#000]'>
                            <PointIcon />
                            이번달 포인트
                          </p>
                        </CardHeader>
                        <CardContent>
                          <p className='typography-heading-2 mb-7 flex items-center text-[#000]'>
                            16
                            <span className='typography-heading-5 ml-[2px] text-gray-700'>
                              점
                            </span>
                          </p>
                          <span className='typography-body-4 text-gray-400'>
                            누적 244
                          </span>
                        </CardContent>
                      </Card>
                    </li>
                    <li className='ml-3 w-[130px]'>
                      <Card className='h-full w-full gap-y-7 p-6'>
                        <CardHeader>
                          <p className='typography-heading-5 flex items-center justify-start text-[#000]'>
                            랭킹 <IconArrowUpFull />
                          </p>
                        </CardHeader>
                        <CardContent>
                          <p className='typography-heading-2 mb-7 flex items-center text-[#000]'>
                            3
                            <span className='typography-heading-5 ml-[2px] text-gray-700'>
                              위
                            </span>
                          </p>
                          <span className='typography-body-4 text-gray-400'>총 24명</span>
                        </CardContent>
                      </Card>
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>

        <div className='mb-7'>
          <Card className='w-full gap-y-8 px-6 py-7'>
            <CardHeader className='flex items-center justify-between'>
              <h2 className='typography-title-2 text-gray-800'>다음 PT예정일</h2>
              <Link href='/' className='typography-body-3 gray-500 h-auto'>
                예약전체
              </Link>
            </CardHeader>
            <CardContent className='flex items-center justify-start'>
              <CheckIcon fill={'var(--primary-500)'} />
              <p className='typography-heading-4 ml-3 text-[#000]'>
                05.23 (월) 오후 1:00
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='mb-7'>
          <Card className='w-full gap-y-8 px-6 py-7'>
            <CardHeader className='flex items-center justify-between'>
              <h2 className='typography-title-1 text-[#000]'>
                수업 일지
                <span className='typography-heading-5 ml-1 inline-block h-7 w-7 rounded-[50%] bg-primary-500 text-center text-[#fff]'>
                  {FEEDBACK_COUNT}
                </span>
              </h2>
              <Link href='/' className='typography-body-3 gray-500 h-auto'>
                수업전체
              </Link>
            </CardHeader>
            <CardContent className='flex items-start justify-start'>
              <span className='h-9 w-9 bg-gray-100'>profile</span>
              <div className='ml-2 w-full overflow-hidden rounded-lg rounded-tl-none bg-gray-100 p-6'>
                <p className='typography-body-4 line-clamp-2 text-[#000]'>
                  회원님 아직 운동 기간이 길지 않아 서있는 자세보다는 오늘과 같이 벤치에
                  앉아서 시작하는게 좋을것 같습니다 회원님 아직 운동 기간이 길지 않아
                  서있는 자세보다는 오늘과 같이 벤치에 앉아서 시작하는게 좋을것
                  같습니다회원님 아직 운동 기간이 길지 않아 서있는 자세보다는 오늘과 같이
                  벤치에 앉아서 시작하는게 좋을것 같습니다
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className='w-full gap-y-8 px-6 py-7'>
            <CardHeader className='flex items-center justify-between'>
              <h2 className='typography-title-1 text-[#000]'>오늘 식단</h2>
              <Link href='/' className='typography-body-3 gray-500 h-auto'>
                식단전체
              </Link>
            </CardHeader>
            <CardContent>
              <ul className='flex items-center justify-between'>
                {dietData.map((item, index) => {
                  return (
                    <li className='w-[calc((100%-12px)/3)]' key={index}>
                      {item.image ? (
                        <Image
                          src={item.image}
                          width={60} //todo : 퍼센트(string)가능하게
                          height={88} //todo : 퍼센트(string)가능하게
                          alt='letter blue heart'
                          className='flex items-center justify-center'
                        />
                      ) : item.fasting ? (
                        <div className='h-[88px] w-full bg-gray-100'></div>
                      ) : (
                        <button className='flex h-[88px] w-full items-center justify-center bg-gray-100'>
                          <PlusIcon width={20} height={20} fill={'var(--gray-500)'} />
                        </button>
                      )}

                      <Button
                        variant='ghost'
                        className='text-Gray-400 typography-title-2 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'>
                        단식
                        <span className='ml-1'>
                          {item.fasting ? (
                            <CheckIcon fill={'var(--primary-500)'} />
                          ) : (
                            <CheckIcon fill={'var(--gray-400)'} />
                          )}
                        </span>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
