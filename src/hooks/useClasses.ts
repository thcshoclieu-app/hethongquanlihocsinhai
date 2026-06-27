import { useState, useEffect, useCallback } from 'react';
import { Classroom } from '../types';
import { ClassService } from '../services/ClassService';

export function useClasses() {
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ClassService.getClasses();
      setClasses(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch classes'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return { classes, loading, error, refetch: fetchClasses };
}
