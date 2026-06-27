import { AttendanceEvent, Attendance } from '@/types';
import { IAttendanceStrategy } from './IAttendanceStrategy';

export class ManualStrategy implements IAttendanceStrategy {
  getMethodName(): string {
    return 'Manual';
  }

  async validate(event: AttendanceEvent): Promise<{ isValid: boolean; error?: string }> {
    if (!event.studentId) {
      return { isValid: false, error: 'Missing Student ID' };
    }
    return { isValid: true };
  }

  async process(event: AttendanceEvent): Promise<Partial<Attendance>> {
    return {
      studentId: event.studentId,
      classId: event.classId,
      teacherId: event.teacherId,
      date: event.time.split('T')[0],
      checkInTime: event.time,
      status: event.status as any || 'present',
      method: 'Manual',
      confidence: 100, // Manual is 100%
      device: event.device,
    };
  }
}
