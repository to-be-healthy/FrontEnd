import { useEffect, useState } from 'react';

const useTimer = (initialState: number, isShow: boolean) => {
  const [timeValue, setTimeValue] = useState(initialState);

  useEffect(() => {
    if (!isShow) {
      setTimeValue(initialState);
      return;
    }

    if (timeValue === 0) return;

    const timerId = setTimeout(() => setTimeValue(timeValue - 1), 1000);

    return () => clearInterval(timerId);
  }, [timeValue, isShow]);

  return timeValue;
};

export { useTimer };
