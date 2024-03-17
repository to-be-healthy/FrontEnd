import * as React from 'react';

/**
 * prop으로 전달할때 callback을 ref로 변환하여 리렌더링을 방지하거나
 * 종속성으로 전달될 때 effect가 다시 실행되지 않도록하는 커스텀 훅
 */
function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
  return React.useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}

export { useCallbackRef };
