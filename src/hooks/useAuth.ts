import { useAuthStore } from '@/store';

export const useAuth = () => {
  const store = useAuthStore();
  
  return {
    ...store,
  };
};
