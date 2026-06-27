import { AttendanceEvent, Attendance } from '@/types';

export interface AttendanceResult {
  success: boolean;
  message: string;
  duplicate?: boolean;
  attendanceRecord?: Attendance;
}

export interface IAttendanceStrategy {
  getMethodName(): string;
  validate(event: AttendanceEvent): Promise<{ isValid: boolean; error?: string }>;
  process(event: AttendanceEvent): Promise<Partial<Attendance>>;
}
