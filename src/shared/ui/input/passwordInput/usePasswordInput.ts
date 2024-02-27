import { useState } from 'react';

const usePasswordInput = () => {
  const [isShowPassword, setIsShowPassword] = useState(true);

  const changeHandler = () => {
    setIsShowPassword((prev) => !prev);
  };

  return { isShowPassword, changeHandler };
};

export default usePasswordInput;
