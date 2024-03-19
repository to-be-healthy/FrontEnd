'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { flexbox } from '@/app/_styles/mixins';
import Button from '@/shared/ui/button/Button';

const SignUpWrap = styled.article`
  ${flexbox('space-between', 'center')}
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TitleWrap = styled.div`
  padding-top: 100px;
  font-size: 26px;
  font-weight: 700;
  line-height: 34px;
  text-align: center;

  h1 {
    width: 30px;
    height: 40px;
    margin: 0 auto 30px;
  }
`;

const SelectGymWrap = styled.ul`
  width: 100%;

  li {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    border-radius: 12px;
  }
`;

const StyledButton = styled(Button)<{ $isActive: boolean | null }>`
  ${flexbox('center', 'center')}
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: 700;
  color: #0f0f0f;
  background-color: ${(props) => (props.$isActive ? '#fff' : '#ddd')};
  border: ${(props) => (props.$isActive ? '2px solid #1990FF' : 'none')};
`;

const NextButton = styled(Button)`
  height: 40px;
`;

export const SignUpStep2 = () => {
  const [clickedButton, setClickedButton] = useState<number | null>(null);

  const handleClickButton = (id: number) => {
    console.log(id);
    setClickedButton(id);
  };

  return (
    <SignUpWrap>
      <TitleWrap>
        <p>
          다니시는 헬스장을
          <br />
          선택해주세요.
        </p>
      </TitleWrap>

      <SelectGymWrap>
        <li>
          <StyledButton
            id='1'
            onClick={() => handleClickButton(1)}
            $isActive={clickedButton === null ? false : clickedButton === 1}>
            건강해짐 헬스장 홍대점
          </StyledButton>
        </li>
        <li>
          <StyledButton
            id='2'
            onClick={() => handleClickButton(2)}
            $isActive={clickedButton === null ? false : clickedButton === 2}>
            바른숨 헬스장 홍대점
          </StyledButton>
        </li>
      </SelectGymWrap>

      <NextButton>다음</NextButton>
    </SignUpWrap>
  );
};
