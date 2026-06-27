import { useUIStore } from '@/store';

export const useLoading = () => {
  const { isLoading, setLoading } = useUIStore();

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      setLoading(true);
      return await fn();
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, setLoading, withLoading };
};
