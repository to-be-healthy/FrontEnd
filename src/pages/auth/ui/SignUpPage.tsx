'use client';

import { SignUpForm } from '@/features/auth';
import { Layout } from '@/shared/ui';

const SignUpPage = () => {
  return (
    <Layout className='bg-white'>
      <SignUpForm />
    </Layout>
  );
};

export { SignUpPage };
