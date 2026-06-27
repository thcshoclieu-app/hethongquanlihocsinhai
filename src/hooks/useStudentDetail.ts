import { useState, useEffect, useCallback } from 'react';
import { Student } from '../types';
import { StudentService } from '../services/StudentService';

export function useStudentDetail(studentId: string | undefined) {
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStudentDetail = useCallback(async () => {
    if (!studentId) return;
    try {
      setLoading(true);
      const data = await StudentService.getStudent(studentId);
      setStudentData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch student details'));
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchStudentDetail();
  }, [fetchStudentDetail]);

  return { studentData, loading, error, refetch: fetchStudentDetail };
}
