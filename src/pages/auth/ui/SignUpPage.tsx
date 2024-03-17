'use client';

import styled from 'styled-components';

import SignUpForm from '@/features/auth/ui/SignUpForm';

import { AuthLayout } from './AuthLayout';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px 20px;
`;

const SignUpPage = () => {
  return (
    <AuthLayout>
      <Container>
        <h2>회원가입</h2>
        <SignUpForm />
      </Container>
    </AuthLayout>
  );
};

export { SignUpPage };
