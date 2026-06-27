import { BaseRepository } from './BaseRepository';
import { Attendance } from '../types';
import { COLLECTIONS } from '../constants/collections';

class AttendanceRepositoryClass extends BaseRepository<Attendance> {
  constructor() {
    super(COLLECTIONS.ATTENDANCE, 'attendanceId');
  }
}

export const AttendanceRepository = new AttendanceRepositoryClass();
