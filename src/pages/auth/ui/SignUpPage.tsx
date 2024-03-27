'use client';

import { SignUpForm } from '@/features/auth/ui';

import AuthLayout from './AuthLayout';

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export { SignUpPage };
