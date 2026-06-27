import { useState, useEffect, useCallback } from 'react';
import { Teacher } from '../types';
import { TeacherService } from '../services/TeacherService';

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await TeacherService.getTeachers();
      setTeachers(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch teachers'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return { teachers, loading, error, refetch: fetchTeachers };
}
