import { useTenant } from '@/contexts/TenantContext';

export function useOrganization() {
  const { currentOrganization } = useTenant();
  return { currentOrganization };
}

export function useCampus() {
  const { currentCampus, campuses, setCurrentCampus } = useTenant();
  return { currentCampus, campuses, setCurrentCampus };
}

export function useSubscription() {
  const { subscription } = useTenant();
  return { subscription };
}

export function useFeatureFlag() {
  const { featureFlags } = useTenant();
  return { featureFlags };
}

export function useQuota() {
  const { quota } = useTenant();
  return { quota };
}
