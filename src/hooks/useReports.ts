import { useState, useEffect, useCallback } from 'react';
import { MonthlyReport } from '../types';
import { ReportService } from '../services/ReportService';

export function useReports() {
  const [reports, setReports] = useState<MonthlyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ReportService.getReports();
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch reports'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { reports, loading, error, refetch: fetchReports };
}
