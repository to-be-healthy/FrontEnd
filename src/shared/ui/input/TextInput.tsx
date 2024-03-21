import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string;
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ defaultValue, ...props }: InputProps, inputRef) => {
    return <input type='text' defaultValue={defaultValue} ref={inputRef} {...props} />;
  }
);

TextInput.displayName = 'TextInput';
