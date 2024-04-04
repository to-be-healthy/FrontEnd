'use client';

import { SignUpForm } from '@/features/auth/ui';
import { Layout } from '@/shared/ui';

const SignUpPage = () => {
  return (
    <Layout className='bg-white'>
      <SignUpForm />
    </Layout>
  );
};

export { SignUpPage };
