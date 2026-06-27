import { describe, it, expect, beforeEach } from 'vitest';
import { AnalyticsService } from './AnalyticsService';
import { useTenantStore } from '@/store/tenantStore';

describe('AnalyticsService', () => {
  beforeEach(() => {
    useTenantStore.getState().setTenant('org_1', 'camp_1');
  });

  it('should return KPI data', async () => {
    const kpi = await AnalyticsService.getDashboardKPI();
    expect(kpi).toBeDefined();
    expect(kpi.totalStudents).toBeGreaterThan(0);
  });

  it('should return revenue data', async () => {
    const revenue = await AnalyticsService.getRevenueData();
    expect(revenue).toBeDefined();
    expect(Array.isArray(revenue)).toBe(true);
  });
});
