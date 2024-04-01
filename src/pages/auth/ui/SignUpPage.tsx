'use client';

import { SignUpForm } from '@/features/auth/ui';
import { Layout } from '@/shared/ui';

const SignUpPage = () => {
  return (
    <Layout type={null}>
      <SignUpForm />
    </Layout>
  );
};

export { SignUpPage };
