import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => void,
  delay: number = 500,
) => {
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    },
    [],
  );

  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]) => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }

      timerIdRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};
