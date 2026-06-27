import { AttendanceEvent } from '@/types';
import { AttendanceService } from '@/services/AttendanceService';

export class AutoAttendanceService {
  /**
   * Điểm danh học sinh thông qua AI Recognition
   */
  static async recordAttendance(data: {
    studentId: string;
    classId: string;
    teacherId: string;
    date: string;
    time: string;
    status: string;
    confidence: number;
    device: string;
  }): Promise<{ success: boolean; message: string; duplicate?: boolean }> {
    
    // Create an Attendance Event from AI result
    const event: AttendanceEvent = {
      eventId: crypto.randomUUID(),
      studentId: data.studentId,
      classId: data.classId,
      teacherId: data.teacherId,
      time: `${data.date}T${data.time}`,
      confidence: data.confidence,
      recognitionResult: null,
      device: data.device,
      status: data.status,
      createdAt: new Date().toISOString(),
      method: 'AI'
    } as any; // Using any as method is not strictly in AttendanceEvent interface right now

    // Delegate to the Strategy-based AttendanceService
    const result = await AttendanceService.recordEvent(event);
    
    return {
      success: result.success,
      message: result.message,
      duplicate: result.duplicate
    };
  }

  // The sync logic has been moved to AttendanceService, but we keep this for backwards compatibility
  // with the window.addEventListener('online')
  static async syncOfflineQueue() {
    await AttendanceService.syncOfflineQueue();
  }
}

// Bắt sự kiện online để đồng bộ tự động
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    AutoAttendanceService.syncOfflineQueue();
  });
}
