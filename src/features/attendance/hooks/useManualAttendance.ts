import { useState } from 'react';
import { AttendanceService } from '@/services/AttendanceService';
import { Attendance } from '@/types';
import { useAuthStore } from '@/store';

export function useManualAttendance() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();

  const createManualAttendance = async (data: Partial<Attendance>) => {
    setIsSubmitting(true);
    try {
      await AttendanceService.createAttendance({
        ...data,
        method: 'Manual',
      }, user?.uid || 'system');
      return { success: true };
    } catch (err: any) {
      console.error(err);
      return { success: false, message: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateAttendance = async (id: string, data: Partial<Attendance>, reason: string = '') => {
    setIsSubmitting(true);
    try {
      await AttendanceService.updateAttendance(id, data, user?.uid || 'system', reason);
      return { success: true };
    } catch (err: any) {
      console.error(err);
      return { success: false, message: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const softDeleteAttendance = async (id: string, reason: string = '') => {
    setIsSubmitting(true);
    try {
      await AttendanceService.softDeleteAttendance(id, user?.uid || 'system', reason);
      return { success: true };
    } catch (err: any) {
      console.error(err);
      return { success: false, message: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const bulkCreate = async (records: Partial<Attendance>[]) => {
    setIsSubmitting(true);
    try {
      await AttendanceService.bulkAttendance(records.map(r => ({ ...r, method: 'Manual' })), user?.uid || 'system');
      return { success: true };
    } catch (err: any) {
      console.error(err);
      return { success: false, message: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createManualAttendance, updateAttendance, softDeleteAttendance, bulkCreate, isSubmitting };
}
