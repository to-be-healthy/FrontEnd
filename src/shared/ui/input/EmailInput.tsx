import { Dispatch, forwardRef, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';

import { useTimer } from '@/shared/hooks';
import Button from '@/shared/ui/button/Button';
import { formatSeconds } from '@/shared/utils/formatSeconds';
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

  &:disabled {
    cursor: no-drop;
    background-color: #c7c9c9;
  }
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
  isShowTimer: boolean;
  setIsShowTimer: Dispatch<SetStateAction<boolean>>;
  isShowEmailVerifiedCodeInput: boolean;
  isEmailVerified: boolean;
}

export const EmailInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onButtonClick,
      isShowTimer,
      setIsShowTimer,
      isShowEmailVerifiedCodeInput,
      isEmailVerified,
      ...props
    }: InputProps,
    inputRef
  ) => {
    const timer = useTimer(180, isShowTimer);
    const { minutes, seconds } = formatSeconds(timer);

    useEffect(() => {
      if (timer === 0) {
        setIsShowTimer(false);
      }
    }, [timer]);

    return (
      <StyledPhoneWrap>
        <Input
          type='email'
          disabled={isEmailVerified || isShowEmailVerifiedCodeInput}
          ref={inputRef}
          {...props}
        />
        {!isEmailVerified && (
          <StyledButton onClick={onButtonClick} disabled={isShowTimer}>
            {isShowEmailVerifiedCodeInput
              ? isShowTimer
                ? `${minutes}:${seconds}`
                : '재요청'
              : '인증요청'}
          </StyledButton>
        )}
      </StyledPhoneWrap>
    );
  }
);

EmailInput.displayName = 'EmailInput';
