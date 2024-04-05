import Image from 'next/image';
import { useRouter } from 'next/navigation';

import IconAlarm from '@/shared/assets/images/icon_alarm.svg';
import CheckIcon from '@/shared/assets/images/icon_check.svg';
import Logo from '@/shared/assets/images/logo.svg';
import { Button, Card, CardContent, CardHeader, Layout } from '@/shared/ui';

export const StudentHomePage = () => {
  const router = useRouter();

  return (
    <Layout type='student'>
      <Layout.Header>
        <Logo width='44px' height='44px' />
        <Button variant='ghost'>
          <IconAlarm />
        </Button>
      </Layout.Header>
      <Layout.Contents>
        <div className='p-7 pt-6'>
          <div className='mb-7'>
            <Card className='w-full gap-y-7 bg-primary-500 p-0'>
              <CardHeader className='p-6 pb-0 text-white'>
                <div className='mb-[5px] flex items-center justify-between'>
                  <p className='typography-body-4'>건강해짐 홍대점 PT 수강권</p>
                  <span className='typography-body-4 text-[#BADCFF]'>24.05.31 만료</span>
                </div>
                <p className='typography-heading-3 mb-8'>4회 남아있어요!</p>

                <div>
                  <p className='typography-heading-5 mb-[6px]'>
                    PT 진행 횟수 6
                    <span className='typography-body-3 text-[#8EC7FF]'>/10</span>
                  </p>
                  <div className='relative h-[2px] w-full bg-[#1F82F0]'>
                    <p className='absolute h-[2px] w-[calc(6/10*100%)] bg-white'></p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='text-white'>
                <div className='rounded-bl-lg rounded-br-lg bg-[#1F82F0]'>
                  <dl className='flex items-center justify-between p-6'>
                    <dt className='typography-heading-5'>3월 랭킹</dt>
                    <dd className='typography-title-1'>16</dd>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='mb-7'>
            <Card className='w-full gap-y-8 py-7'>
              <CardHeader className='flex items-center justify-between'>
                <p className='typography-title-2 text-gray-800'>다음 PT예정일</p>
                <Button variant='ghost' className='typography-body-3 gray-500 h-auto p-0'>
                  예약전체
                </Button>
              </CardHeader>
              <CardContent className='flex items-center justify-start'>
                <CheckIcon />
                <p className='typography-heading-4 ml-3 text-[#000]'>
                  05.23 (월) 오후 1:00
                </p>
              </CardContent>
            </Card>
          </div>

          <div className='flex justify-between gap-4'>
            <Card
              className='h-[140px] w-[155px] cursor-pointer'
              onClick={() => router.push('/student/manage')}>
              <CardHeader>수업</CardHeader>
              <CardContent>
                <p>{`내 수업 내역을\n한눈에 조회`}</p>
                <div className='absolute bottom-[13px] right-[8px] h-[60px] w-[60px]'>
                  <Image
                    src='/images/icon_calendar_shadow.png'
                    fill
                    sizes='auto'
                    priority
                    alt='Calendar image for classes'
                  />
                </div>
              </CardContent>
            </Card>
            <Card
              className='h-[140px] w-[155px] cursor-pointer'
              onClick={() => router.push('/student/manage')}>
              <CardHeader>식단</CardHeader>
              <CardContent>
                <p>{`간편 기록과 공유를\n통한 식단관리`}</p>
                <div className='absolute bottom-[13px] right-[8px] h-[60px] w-[60px]'>
                  <Image
                    src='/images/icon_food.png'
                    fill
                    sizes='auto'
                    priority
                    alt='Card image of diet'
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
