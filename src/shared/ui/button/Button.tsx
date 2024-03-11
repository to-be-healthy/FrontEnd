import { ReactNode } from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 100%;
  height: 100%;
  color: #000;
  background-color: #ddd;
  border-radius: 5px;
`;

interface Props {
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  className,
  type = 'button',
  children,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <StyledButton className={className} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
