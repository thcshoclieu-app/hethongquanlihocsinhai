import { useState, useEffect, useCallback } from 'react';
import { Attendance } from '../types';
import { AttendanceService } from '../services/AttendanceService';

export function useAttendance() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);
      const data = await AttendanceService.getAttendances();
      setAttendance(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch attendance'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return { attendance, loading, error, refetch: fetchAttendance };
}
