'use client';

import Link from 'next/link';

import { StudentList } from '@/feature/manage';
import { AddStudentDialog } from '@/feature/member';
import { IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const StudentListPage = () => {
  return (
    <Layout type='trainer'>
      <Layout.Header className='bg-transparent'>
        <Link href={'/trainer'}>
          <IconBack />
        </Link>
        <h2 className={cn(Typography.HEADING_4)}>나의 회원</h2>
        <AddStudentDialog />
      </Layout.Header>
      <Layout.Contents className='overflow-y-hidden'>
        <StudentList />
      </Layout.Contents>
    </Layout>
  );
};

export { StudentListPage };
