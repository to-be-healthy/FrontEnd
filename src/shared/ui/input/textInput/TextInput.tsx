import { forwardRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;

  &:disabled {
    cursor: no-drop;
    background-color: gray;
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string;
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ defaultValue, ...props }: InputProps, inputRef) => {
    return (
      <StyledInput type='text' defaultValue={defaultValue} ref={inputRef} {...props} />
    );
  }
);

TextInput.displayName = 'TextInput';
