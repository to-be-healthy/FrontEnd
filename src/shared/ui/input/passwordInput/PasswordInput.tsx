import { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';

import HidePasswordIcon from '@/assets/hidePasswordIcon.svg';
import ShowPasswordIcon from '@/assets/showPasswordIcon.svg';
import Button from '@/shared/ui/button/Button';

const StyledPasswordWrap = styled.div`
  position: relative;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
`;

const StyledButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 10px;
  width: 24px;
  height: 24px;

  background-color: transparent;
  transform: translate(0, -50%);
`;

const IconStyles = css`
  path {
    stroke: #252222;
  }
`;

const StyledShowPassswordIcon = styled(ShowPasswordIcon)`
  ${IconStyles}
`;

const StyledHidePasswordIcon = styled(HidePasswordIcon)`
  ${IconStyles}
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasClear?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }: InputProps, inputRef) => {
    const [isShowPassword, setIsShowPassword] = useState(true);

    const handlePasswordIconClick = () => {
      setIsShowPassword((prev) => !prev);
    };

    return (
      <StyledPasswordWrap>
        <Input ref={inputRef} type={isShowPassword ? 'password' : 'text'} {...props} />
        <StyledButton onClick={handlePasswordIconClick}>
          {isShowPassword ? <StyledHidePasswordIcon /> : <StyledShowPassswordIcon />}
        </StyledButton>
      </StyledPasswordWrap>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
