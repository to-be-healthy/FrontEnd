import { forwardRef } from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 100%;
  height: 100%;
  color: #000;
  background-color: #4b92d4;
  border-radius: 5px;

  &:disabled {
    cursor: no-drop;
    background-color: gray;
  }
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <StyledButton ref={ref} {...props} />;
});

Button.displayName = 'Button';

export default Button;
