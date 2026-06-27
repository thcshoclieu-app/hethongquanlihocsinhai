import { useState, useEffect } from 'react';
import { getStorage, setStorage } from '@/utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getStorage(key, initialValue);
  });

  useEffect(() => {
    setStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
