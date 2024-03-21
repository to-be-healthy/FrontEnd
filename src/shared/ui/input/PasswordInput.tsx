import { forwardRef, useState } from 'react';

// import HidePasswordIcon from '@/assets/hidePasswordIcon.svg';
// import ShowPasswordIcon from '@/assets/showPasswordIcon.svg';
import Button from '@/shared/ui/button/Button';

// const IconStyles = css`
//   path {
//     stroke: #252222;
//   }
// `;

// const StyledShowPassswordIcon = styled(ShowPasswordIcon)`
//   ${IconStyles}
// `;

// const StyledHidePasswordIcon = styled(HidePasswordIcon)`
//   ${IconStyles}
// `;

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
      <div>
        <input ref={inputRef} type={isShowPassword ? 'password' : 'text'} {...props} />
        <Button onClick={handlePasswordIconClick}>
          {isShowPassword ? '숨김' : '보임'}
          {/* {isShowPassword ? <StyledHidePasswordIcon /> : <StyledShowPassswordIcon />} */}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
