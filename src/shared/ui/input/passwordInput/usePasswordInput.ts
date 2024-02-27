import { useState } from 'react';

const usePasswordInput = () => {
  const [isShowPassword, setIsShowPassword] = useState(true);

  const clickHandler = () => {
    setIsShowPassword((prev) => !prev);
  };

  return { isShowPassword, clickHandler };
};

export default usePasswordInput;
