import { useState, useEffect, useCallback } from 'react';
import { Classroom } from '../types';
import { ClassService } from '../services/ClassService';

export function useClassDetail(classId: string | undefined) {
  const [classData, setClassData] = useState<Classroom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchClassDetail = useCallback(async () => {
    if (!classId) return;
    try {
      setLoading(true);
      const data = await ClassService.getClass(classId);
      setClassData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch class details'));
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    fetchClassDetail();
  }, [fetchClassDetail]);

  return { classData, loading, error, refetch: fetchClassDetail };
}
