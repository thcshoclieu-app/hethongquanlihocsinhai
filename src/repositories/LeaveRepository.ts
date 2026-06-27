import { LeaveRequest } from '@/types';
import { BaseRepository } from '@/repositories/BaseRepository';
import { where } from 'firebase/firestore';

export class LeaveRepository extends BaseRepository<LeaveRequest> {
  constructor() {
    super('leaveRequests', 'id');
  }

  async getByStudent(studentId: string): Promise<LeaveRequest[]> {
    return this.getAll([where('studentId', '==', studentId)]);
  }

  async getByClass(classId: string): Promise<LeaveRequest[]> {
    return this.getAll([where('classId', '==', classId)]);
  }
}
