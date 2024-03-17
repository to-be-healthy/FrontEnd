import styled from 'styled-components';

import { flexbox } from '@/styles/mixins/flexbox';

import { NavLink } from './NavLink';

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 360px;
  height: 50px;

  ul {
    width: 100%;
    height: 100%;
    ${flexbox('space-between', 'center')}
  }
`;

export const TrainerNavigationBar = () => {
  return (
    <Nav>
      <ul>
        <li>
          <NavLink href='/'>홈</NavLink>
        </li>
        <li>
          <NavLink href='/manage'>회원관리</NavLink>
        </li>
        <li>
          <NavLink href='/schedule'>스케쥴관리</NavLink>
        </li>
        <li>
          <NavLink href='/mypage'>내정보</NavLink>
        </li>
      </ul>
    </Nav>
  );
};
