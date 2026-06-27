import { AttendanceEvent, Attendance } from '@/types';
import { IAttendanceStrategy } from './IAttendanceStrategy';

export class AIStrategy implements IAttendanceStrategy {
  getMethodName(): string {
    return 'AI';
  }

  async validate(event: AttendanceEvent): Promise<{ isValid: boolean; error?: string }> {
    if (event.confidence < 0.5) { // Can be configured further
      return { isValid: false, error: 'Confidence too low' };
    }
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
      method: 'AI',
      confidence: event.confidence,
      device: event.device,
    };
  }
}
