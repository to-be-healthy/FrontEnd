import { forwardRef } from 'react';
import styled from 'styled-components';

import { Slot } from '@/shared/utils/slot';

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #000;
  white-space: nowrap;
  background-color: #4b92d4;
  border-radius: 5px;
  outline: none;
  opacity: 0.5;
  transition: color 0.2s;

  &:disabled {
    cursor: no-drop;
    background-color: gray;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  asChild?: boolean;
}
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { asChild = false, ...rest } = props;
  return asChild ? <Slot ref={ref} {...rest} /> : <StyledButton ref={ref} {...rest} />;
});

Button.displayName = 'Button';

export default Button;
