'use client';

import { LoginForm } from '@/features/auth/ui';
import Logo from '@/shared/assets/images/logo.svg';

import AuthLayout from './AuthLayout';

export const SignInPage = () => {
  return (
    <AuthLayout>
      <div>
        <h2>로그인</h2>
        <Logo />
        <LoginForm />
      </div>
    </AuthLayout>
  );
};
