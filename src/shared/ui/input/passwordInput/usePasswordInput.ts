import { useState } from 'react';

const usePasswordInput = () => {
  const [isShowPassword, setIsShowPassword] = useState(true);

  const handlePasswordIconClick = () => {
    setIsShowPassword((prev) => !prev);
  };

  return { isShowPassword, handlePasswordIconClick };
};

export default usePasswordInput;
