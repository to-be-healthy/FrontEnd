'use client';

import styled from 'styled-components';

import { TrainerNavigationBar } from '@/shared/ui/navigationBar';

const TrainerWrap = styled.section`
  width: 360px;
  height: 100vh;
  margin: 0 auto;
  background-color: #70909e;
`;

interface ComponentProps {
  children: React.ReactNode;
}

const TrainerLayout = ({ children }: ComponentProps) => {
  return (
    <TrainerWrap>
      {children}
      <TrainerNavigationBar />
    </TrainerWrap>
  );
};

export default TrainerLayout;
