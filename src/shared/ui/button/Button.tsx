import { ReactNode } from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button<{
  color: string;
  $bgColor: string;
  $borderRadius: string;
}>`
  width: 100%;
  height: 100%;
  color: ${(props) => props.color};
  background-color: ${(props) => props.$bgColor};
  border-radius: ${(props) => props.$borderRadius};
`;

interface Props {
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  children: ReactNode | string;
  disabled?: boolean;
  onClick: () => void;
  color?: string;
  bgColor?: string;
  borderRadius?: string;
}

const Button = ({
  className,
  type = 'button',
  children,
  disabled = false,
  color = '#000',
  bgColor = '#ddd',
  borderRadius = '5px',
}: Props) => {
  return (
    <StyledButton
      className={className}
      type={type}
      disabled={disabled}
      color={color}
      $bgColor={bgColor}
      $borderRadius={borderRadius}>
      {children}
    </StyledButton>
  );
};

export default Button;
