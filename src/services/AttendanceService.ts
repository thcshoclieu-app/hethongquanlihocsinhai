import { AttendanceRepository } from '../repositories/AttendanceRepository';
import { Attendance, AttendanceEvent, AttendanceLog } from '../types';
import { IAttendanceStrategy, AttendanceResult } from './attendance/strategies/IAttendanceStrategy';
import { AIStrategy } from './attendance/strategies/AIStrategy';
import { ManualStrategy } from './attendance/strategies/ManualStrategy';
import { where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { get, set } from 'idb-keyval';

const OFFLINE_QUEUE_KEY = 'attendance_offline_queue';

export class AttendanceService {
  private static strategies: Map<string, IAttendanceStrategy> = new Map();

  static {
    this.registerStrategy(new AIStrategy());
    this.registerStrategy(new ManualStrategy());
  }

  static registerStrategy(strategy: IAttendanceStrategy) {
    this.strategies.set(strategy.getMethodName(), strategy);
  }

  /**
   * Process an incoming Attendance Event
   */
  static async recordEvent(event: AttendanceEvent): Promise<AttendanceResult> {
    const isOnline = navigator.onLine;

    const strategyName = event.method || 'AI'; // Assuming event has method, or default to AI
    const strategy = this.strategies.get(strategyName);

    if (!strategy) {
      return { success: false, message: `Strategy ${strategyName} not supported` };
    }

    const { isValid, error } = await strategy.validate(event);
    if (!isValid) {
      return { success: false, message: error || 'Validation failed' };
    }

    const partialRecord = await strategy.process(event);
    const dateStr = partialRecord.date || new Date().toISOString().split('T')[0];

    // Check Duplicate
    if (isOnline) {
      try {
        const existing = await AttendanceRepository.getAll([
          where('studentId', '==', partialRecord.studentId),
          where('date', '==', dateStr),
          where('isDeleted', '!=', true)
        ]);

        if (existing.length > 0) {
          // Check if already checked in and we need to check out? For now, standard is "duplicate"
          return { success: false, message: 'Đã điểm danh hôm nay', duplicate: true };
        }
      } catch (err) {
        console.warn('Duplicate check failed, assuming offline mode');
      }
    }

    const attendanceId = crypto.randomUUID();
    const record: Attendance = {
      ...partialRecord,
      attendanceId,
      time: partialRecord.checkInTime?.split('T')[1]?.substring(0, 5) || new Date().toTimeString().substring(0, 5),
      photo: partialRecord.photo || '',
      gps: partialRecord.gps || '',
      note: partialRecord.note || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDeleted: false,
    } as Attendance;

    if (isOnline) {
      try {
        await AttendanceRepository.create(attendanceId, record);
        await this.logAudit(attendanceId, 'Create', record.teacherId, 'Điểm danh ' + strategyName);
        return { success: true, message: 'Điểm danh thành công', attendanceRecord: record };
      } catch (err: any) {
        console.error('Firebase save error, queueing offline', err);
      }
    }

    await this.addToQueue(record);
    return { success: true, message: 'Đã lưu offline' };
  }

  // --- MANUAL ATTENDANCE / BULK --- //
  static async createAttendance(data: Partial<Attendance>, userId: string): Promise<void> {
    const id = data.attendanceId || crypto.randomUUID();
    const record = { 
      ...data, 
      attendanceId: id, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDeleted: false 
    } as Attendance;

    await AttendanceRepository.create(id, record);
    await this.logAudit(id, 'Manual Create', userId, 'Điểm danh thủ công');
  }

  static async bulkAttendance(records: Partial<Attendance>[], userId: string): Promise<void> {
    for (const data of records) {
      await this.createAttendance(data, userId);
    }
  }

  // --- UPDATE & SOFT DELETE --- //
  static async updateAttendance(id: string, data: Partial<Attendance>, userId: string, reason: string = ''): Promise<void> {
    const updateData = { ...data, updatedAt: new Date().toISOString() };
    await AttendanceRepository.update(id, updateData);
    await this.logAudit(id, 'Update', userId, reason || 'Cập nhật thông tin');
  }

  static async softDeleteAttendance(id: string, userId: string, reason: string = ''): Promise<void> {
    await AttendanceRepository.update(id, { isDeleted: true, deletedAt: new Date().toISOString() });
    await this.logAudit(id, 'Soft Delete', userId, reason || 'Hủy điểm danh');
  }

  static async restoreAttendance(id: string, userId: string): Promise<void> {
    await AttendanceRepository.update(id, { isDeleted: false, deletedAt: '' });
    await this.logAudit(id, 'Restore', userId, 'Khôi phục điểm danh');
  }

  // --- RETRIEVAL --- //
  static async getAttendances(classId?: string, date?: string): Promise<Attendance[]> {
    const constraints: any[] = [];
    if (classId) constraints.push(where('classId', '==', classId));
    if (date) constraints.push(where('date', '==', date));
    constraints.push(orderBy('createdAt', 'desc'));
    
    return AttendanceRepository.getAll(constraints);
  }

  static async getAttendance(id: string): Promise<Attendance | null> {
    return AttendanceRepository.getById(id);
  }

  // --- AUDIT LOG --- //
  private static async logAudit(attendanceId: string, action: string, userId: string, detail: string) {
    try {
      if (!navigator.onLine) return; // Skip if offline, or implement local queue
      const logEntry: AttendanceLog = {
        logId: crypto.randomUUID(),
        attendanceId,
        action,
        user: userId,
        time: new Date().toISOString(),
        detail
      };
      await addDoc(collection(db, 'attendanceLogs'), logEntry);
    } catch (e) {
      console.warn('Audit log failed', e);
    }
  }

  // --- OFFLINE QUEUE --- //
  private static async addToQueue(record: Attendance) {
    const queue = (await get<Attendance[]>(OFFLINE_QUEUE_KEY)) || [];
    queue.push(record);
    await set(OFFLINE_QUEUE_KEY, queue);
  }

  static async syncOfflineQueue() {
    if (!navigator.onLine) return;
    const queue = (await get<Attendance[]>(OFFLINE_QUEUE_KEY)) || [];
    if (queue.length === 0) return;

    const remaining = [];
    let syncedCount = 0;

    for (const record of queue) {
      try {
        await AttendanceRepository.create(record.attendanceId, record);
        await this.logAudit(record.attendanceId, 'Sync', record.teacherId, 'Đồng bộ Offline');
        syncedCount++;
      } catch (err) {
        remaining.push(record);
      }
    }

    await set(OFFLINE_QUEUE_KEY, remaining);
    if (syncedCount > 0) {
      console.log(`Đã đồng bộ ${syncedCount} bản ghi.`);
    }
  }
}

