import { ChangeEvent, forwardRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

interface Props {
  disabled?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ disabled = false, value, onChange, placeholder }: Props, inputRef) => {
    return (
      <StyledInput
        type='text'
        ref={inputRef}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
