'use client';

import styled from 'styled-components';

import { SignUpStep2 } from '@/features/auth/ui';

import { AuthLayout } from './AuthLayout';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px 20px;
`;

const SignUpPage = () => {
  return (
    <AuthLayout>
      <Container>
        {/* step 1 */}
        {/* <SignUpStep1 /> */}

        {/* step 2 */}
        <SignUpStep2 />

        {/* <SignUpForm /> */}

        {/* step 3 */}

        {/* step 4 */}
      </Container>
    </AuthLayout>
  );
};

export { SignUpPage };
