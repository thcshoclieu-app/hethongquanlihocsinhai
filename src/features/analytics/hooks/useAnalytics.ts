import { useState, useEffect } from 'react';
import { AnalyticsService } from '@/services/analytics/AnalyticsService';
import { KPI } from '@/types';

export function useAnalytics() {
  const [kpi, setKpi] = useState<KPI | null>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [demographicData, setDemographicData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [kpiData, rev, att, demo] = await Promise.all([
          AnalyticsService.getDashboardKPI(),
          AnalyticsService.getRevenueData(),
          AnalyticsService.getAttendanceData(),
          AnalyticsService.getStudentDemographics()
        ]);
        setKpi(kpiData);
        setRevenueData(rev);
        setAttendanceData(att);
        setDemographicData(demo);
      } catch (error) {
        console.error('Error fetching analytics data', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return { kpi, revenueData, attendanceData, demographicData, isLoading };
}
