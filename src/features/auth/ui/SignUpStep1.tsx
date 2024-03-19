'use client';

import styled from 'styled-components';

import { flexbox } from '@/app/_styles/mixins';

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

const TypeWrap = styled.ul`
  width: 100%;

  li {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    border-radius: 12px;

    a {
      width: 100%;
      height: 100%;
      font-size: 18px;
      font-weight: 700;
      color: #0f0f0f;
      background-color: #f2f3f5;
      ${flexbox('center', 'center')}
    }
  }
`;

export const SignUpStep1 = () => {
  return (
    <SignUpWrap>
      <TitleWrap>
        <h1>g</h1>
        <p>
          안녕하세요!
          <br />
          건강해짐입니다.
        </p>
      </TitleWrap>

      <TypeWrap>
        <li>
          <a>트레이너로 시작</a>
        </li>
        <li>
          <a>회원으로 시작</a>
        </li>
      </TypeWrap>
    </SignUpWrap>
  );
};
