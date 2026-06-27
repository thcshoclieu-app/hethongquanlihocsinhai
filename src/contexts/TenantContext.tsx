import React, { createContext, useContext, useState, useEffect } from 'react';
import { Organization, Campus, Subscription, FeatureFlag, Quota } from '@/types';
import { OrganizationService } from '@/services/tenant/OrganizationService';
import { CampusService } from '@/services/tenant/CampusService';
import { SubscriptionService } from '@/services/tenant/SubscriptionService';
import { FeatureFlagService } from '@/services/tenant/FeatureFlagService';
import { QuotaService } from '@/services/tenant/QuotaService';
import { Spinner } from '@/components/ui/spinner';
import { useTenantStore } from '@/store/tenantStore';

interface TenantContextProps {
  currentOrganization: Organization | null;
  currentCampus: Campus | null;
  campuses: Campus[];
  subscription: Subscription | null;
  featureFlags: FeatureFlag | null;
  quota: Quota | null;
  setCurrentCampus: (campus: Campus) => void;
  isLoading: boolean;
}

const TenantContext = createContext<TenantContextProps | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [currentCampus, setCurrentCampus] = useState<Campus | null>(null);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag | null>(null);
  const [quota, setQuota] = useState<Quota | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const setTenantStore = useTenantStore(state => state.setTenant);

  useEffect(() => {
    async function initTenant() {
      try {
        const org = await OrganizationService.getCurrentOrganization();
        setCurrentOrganization(org);
        
        const orgCampuses = await CampusService.getCampusesByOrg(org.id);
        setCampuses(orgCampuses);
        if (orgCampuses.length > 0) {
          setCurrentCampus(orgCampuses[0]);
          setTenantStore(org.id, orgCampuses[0].id);
        }

        const sub = await SubscriptionService.getCurrentSubscription(org.id);
        setSubscription(sub);

        if (sub) {
          const flags = await FeatureFlagService.getFeatureFlags(sub.planId);
          setFeatureFlags(flags);
        }

        const q = await QuotaService.getCurrentQuota(org.id);
        setQuota(q);

      } catch (error) {
        console.error('Failed to initialize tenant', error);
      } finally {
        setIsLoading(false);
      }
    }

    initTenant();
  }, [setTenantStore]);

  const handleSetCampus = (campus: Campus) => {
    setCurrentCampus(campus);
    if (currentOrganization) {
      setTenantStore(currentOrganization.id, campus.id);
    }
  };

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center"><Spinner size="lg" /></div>;
  }

  return (
    <TenantContext.Provider value={{
      currentOrganization,
      currentCampus,
      campuses,
      subscription,
      featureFlags,
      quota,
      setCurrentCampus: handleSetCampus,
      isLoading
    }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
