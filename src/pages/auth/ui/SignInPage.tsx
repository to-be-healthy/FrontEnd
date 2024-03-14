'use client';

import { styled } from 'styled-components';

import { LoginForm } from '@/features/auth/ui';

import { AuthLayout } from './AuthLayout';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px 20px;
`;

export const SignInPage = () => {
  return (
    <AuthLayout>
      <Container>
        <h2>로그인</h2>
        <LoginForm />
      </Container>
    </AuthLayout>
  );
};
