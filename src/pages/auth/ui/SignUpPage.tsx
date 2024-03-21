'use client';

import { SignUpStep2 } from '@/features/auth/ui';

import AuthLayout from './AuthLayout';

const SignUpPage = () => {
  return (
    <AuthLayout>
      <div>
        {/* step 1 */}
        {/* <SignUpStep1 /> */}

        {/* step 2 */}
        <SignUpStep2 />

        {/* <SignUpForm /> */}

        {/* step 3 */}

        {/* step 4 */}
      </div>
    </AuthLayout>
  );
};

export { SignUpPage };
