'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const useQueryString = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getQueryString = (key: string): string | null => {
    return searchParams.get(key);
  };

  const setQueryString = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.replace(`?${params.toString()}`);
  };

  const getAllQueryStrings = useMemo(() => {
    return Object.fromEntries(Array.from(searchParams.entries()));
  }, [searchParams]);

  return { getQueryString, setQueryString, getAllQueryStrings };
};

export { useQueryString };
