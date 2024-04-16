import Link from 'next/link';

import CloseIcon from '@/shared/assets/images/icon_close.svg';
import { Card, CardContent, CardHeader, Layout, Progress } from '@/shared/ui';

export const StudentClassTickets = () => {
  return (
    <Layout type='student'>
      <Layout.Header className='relative flex justify-center bg-[#fff]'>
        <Link href='./' className='absolute left-7'>
          <CloseIcon />
        </Link>
        <h2>내 수강권</h2>
      </Layout.Header>
      <Layout.Contents>
        <div className='bg-[#fff] p-7 pb-[58px] pt-6'>
          <Card className='w-full gap-y-8 bg-primary-500 px-6 py-7 text-[#fff]'>
            <CardHeader>
              <div className='typography-body-4 mb-1 flex items-center justify-between text-[#E2F1FF]'>
                <p>건강해짐 홍대점</p>
                <span>PT 수강권</span>
              </div>
              <p className='typography-heading-3'>4회 남아있어요!</p>
            </CardHeader>
            <CardContent>
              <div>
                <p className='typography-heading-5 mb-[6px] text-[#fff]'>
                  PT 진행 횟수 6
                  <span className='typography-body-3 text-[#8EC7FF]'>/10</span>
                </p>
                <Progress className='h-[2px]' value={60} />
              </div>
            </CardContent>
          </Card>
        </div>

        <ul className='bg-gray-100'>
          <li className='px-7 py-8'>
            <p className='typography-body-4 text-gray-500'>24.03.27</p>
            <dl className='flex items-center justify-between'>
              <dt className='typography-title-3 text-gray-700'>출석</dt>
              <dd className='typography-title-3 text-[#000]'>+1</dd>
            </dl>
          </li>
        </ul>
      </Layout.Contents>
    </Layout>
  );
};
