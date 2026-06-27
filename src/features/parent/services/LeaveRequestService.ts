import { LeaveRequest } from '@/types';
import { LeaveRepository } from '@/repositories/LeaveRepository';

export class LeaveRequestService {
  private leaveRepo = new LeaveRepository();

  async getRequestsByStudent(studentId: string): Promise<LeaveRequest[]> {
    return this.leaveRepo.getByStudent(studentId);
  }

  async createLeaveRequest(data: Partial<LeaveRequest>): Promise<void> {
    const id = `lr_${Date.now()}`;
    await this.leaveRepo.create(id, {
      ...data,
      id,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    });
  }

  async updateLeaveRequest(id: string, data: Partial<LeaveRequest>): Promise<void> {
    await this.leaveRepo.update(id, data);
  }
}
