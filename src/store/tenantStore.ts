import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Organization, Campus } from '@/types';

interface TenantState {
  organizationId: string | null;
  campusId: string | null;
  setTenant: (orgId: string, campusId: string) => void;
  clearTenant: () => void;
}

export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      organizationId: null,
      campusId: null,
      setTenant: (organizationId, campusId) => set({ organizationId, campusId }),
      clearTenant: () => set({ organizationId: null, campusId: null }),
    }),
    {
      name: 'tenant-storage',
    }
  )
);
