import { Dispatch, forwardRef, SetStateAction, useEffect } from 'react';

import { useTimer } from '@/shared/hooks';
import { Button } from '@/shared/ui/button';
import { formatSeconds } from '@/shared/utils/formatSeconds';

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
      <div>
        <input
          type='email'
          disabled={isEmailVerified || isShowEmailVerifiedCodeInput}
          ref={inputRef}
          {...props}
        />
        {!isEmailVerified && (
          <Button onClick={onButtonClick} disabled={isShowTimer}>
            {isShowEmailVerifiedCodeInput
              ? isShowTimer
                ? `${minutes}:${seconds}`
                : '재요청'
              : '인증요청'}
          </Button>
        )}
      </div>
    );
  }
);

EmailInput.displayName = 'EmailInput';
