import { css } from 'styled-components';

export const flexbox = (js = 'center', al = 'center') => css`
  display: flex;
  align-items: ${al};
  justify-content: ${js};
`;
