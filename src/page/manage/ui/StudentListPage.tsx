'use client';

import Link from 'next/link';

import { StudentList } from '@/feature/manage';
import { AddStudentDialog } from '@/feature/member';
import { IconBack } from '@/shared/assets';
import { Layout } from '@/widget';

const StudentListPage = () => {
  return (
    <Layout className='flex flex-col'>
      <Layout.Header className='bg-transparent'>
        <Link href={'/trainer'}>
          <IconBack />
        </Link>
        <h2 className='typography-heading-4 font-semibold'>나의 회원</h2>
        <AddStudentDialog />
      </Layout.Header>
      <Layout.Contents className='overflow-y-hidden'>
        <StudentList />
      </Layout.Contents>
    </Layout>
  );
};

export { StudentListPage };
