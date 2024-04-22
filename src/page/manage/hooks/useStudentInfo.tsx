import { useStudentDetailQuery } from '@/feature/member';

const useStudentInfo = (memberId: number) => {
  const {
    data: memberInfo,
    refetch: refetchMemberInfo,
    isLoading,
  } = useStudentDetailQuery(memberId);

  return {
    memberInfo,
    refetchMemberInfo,
    isLoading,
  };
};

export { useStudentInfo };
