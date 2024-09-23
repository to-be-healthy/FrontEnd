'use client';

import { useEffect, useState } from 'react';

export const usePreviousPage = () => {
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasPreviousPage(window.history.length > 1);
    }
  }, []);

  return {
    hasPreviousPage,
  };
};
