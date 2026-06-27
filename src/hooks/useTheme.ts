import { useThemeStore } from '@/store';

export const useTheme = () => {
  const { mode, setMode } = useThemeStore();

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return { mode, setMode, toggleTheme };
};
