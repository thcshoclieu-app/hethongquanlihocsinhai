import { useState, useEffect, useCallback } from 'react';
import { Student } from '../types';
import { StudentService } from '../services/StudentService';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await StudentService.getStudents();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch students'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return { students, loading, error, refetch: fetchStudents };
}
