import { forwardRef } from 'react';
import styled from 'styled-components';

import Button from '@/shared/ui/button/Button';
import { flexbox } from '@/styles/mixins/flexbox';

const StyledPhoneWrap = styled.div`
  ${flexbox('center', 'center')}
  height:46px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const StyledButton = styled(Button)`
  width: 100px;
  height: 100%;
  margin-left: 10px;
  color: #fff;
  background-color: #a561c2;
  border-radius: 5px;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onButtonClick: () => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, InputProps>(
  ({ onButtonClick, ...props }: InputProps, inputRef) => {
    return (
      <StyledPhoneWrap>
        <Input type='tel' ref={inputRef} {...props} />
        <StyledButton onClick={onButtonClick}>인증요청</StyledButton>
      </StyledPhoneWrap>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
