import { useState, useEffect, useCallback } from 'react';
import { AttendanceService } from '@/services/AttendanceService';
import { Attendance } from '@/types';

export function useAttendance(classId?: string, date?: string) {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendances = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await AttendanceService.getAttendances(classId, date);
      setAttendances(data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch attendances', err);
      setError('Lỗi khi tải dữ liệu điểm danh');
    } finally {
      setIsLoading(false);
    }
  }, [classId, date]);

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  const removeAttendance = useCallback((id: string) => {
    setAttendances(prev => prev.filter(a => a.attendanceId !== id));
  }, []);

  return { attendances, isLoading, error, refetch: fetchAttendances, removeAttendance };
}
