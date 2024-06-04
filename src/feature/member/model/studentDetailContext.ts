'use clieint';

import { createContext, useContext, useMemo } from 'react';

import { useStudentDetailQuery } from '../api/useStudentDetailQuery';

const useStudentDetail = (memberId: number) => {
  const { data, isPending, refetch } = useStudentDetailQuery(memberId);

  if (!data && !isPending) {
    throw new Error();
  }

  return useMemo(
    () => ({
      memberInfo: data,
      refetch,
    }),
    [data, refetch]
  );
};

type ContextType = ReturnType<typeof useStudentDetail> | null;

const StudentDetailContext = createContext<ContextType>(null);

const useStudentDetailContext = () => {
  const value = useContext(StudentDetailContext);

  if (!value) {
    throw new Error();
  }

  return value;
};

export { StudentDetailContext, useStudentDetail, useStudentDetailContext };
