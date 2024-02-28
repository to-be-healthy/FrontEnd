import { ChangeEvent, forwardRef } from 'react';
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

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, onButtonClick, disabled, placeholder }: Props, inputRef) => {
    return (
      <StyledPhoneWrap>
        <Input
          type='tel'
          ref={inputRef}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <StyledButton onClick={onButtonClick}>인증요청</StyledButton>
      </StyledPhoneWrap>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
