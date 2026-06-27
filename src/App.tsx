/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useEffect } from 'react';
import { useThemeStore } from './store';
import { useAuthInitializer } from './hooks/useAuthInitializer';
import { TenantProvider } from './contexts/TenantContext';

export default function App() {
  const { mode } = useThemeStore();
  
  useAuthInitializer();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(mode);
    }
  }, [mode]);

  return (
    <TenantProvider>
      <RouterProvider router={router} />
    </TenantProvider>
  );
}
