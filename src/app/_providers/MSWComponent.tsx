'use client';
import { useEffect } from 'react';

const isMockEnabled =
  typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

export const MSWComponent = () => {
  useEffect(() => {
    if (isMockEnabled) {
      import('@/shared/lib/mocks');
    }
  }, []);

  return null;
};
