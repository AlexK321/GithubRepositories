import { useState, useEffect } from 'react';

interface IInputValue {
  qualifier: string;
  value: string;
}

const useDebounce = (value: IInputValue, delay: number): IInputValue => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
