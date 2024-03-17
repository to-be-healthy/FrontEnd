'use client';

import styled from 'styled-components';

import { MemberNavigationBar } from '@/shared/ui/navigationBar';

const MemberWrap = styled.section`
  width: 360px;
  height: 100vh;
  margin: 0 auto;
  background-color: #70909e;
`;

interface ComponentProps {
  children: React.ReactNode;
}

const MemberLayout = ({ children }: ComponentProps) => {
  return (
    <MemberWrap>
      {children}
      <MemberNavigationBar />
    </MemberWrap>
  );
};

export default MemberLayout;
