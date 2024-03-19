'use client';

import { styled } from 'styled-components';

import { LoginForm } from '@/features/auth/ui';
import Logo from '@/shared/assets/images/logo.svg';

import { AuthLayout } from './AuthLayout';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px 20px;
  font-size: 30px;
  font-weight: 500;
`;

export const SignInPage = () => {
  return (
    <AuthLayout>
      <Container>
        <h2>프리텐다드</h2>
        <Logo />
        <LoginForm />
      </Container>
    </AuthLayout>
  );
};
