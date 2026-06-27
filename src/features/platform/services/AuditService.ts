import { AuditLogRepository } from '@/repositories/AuditLogRepository';
import { AuditLog } from '@/types';

export class AuditService {
  private repo = new AuditLogRepository();

  async getLogs(): Promise<AuditLog[]> {
    return this.repo.getAll();
  }

  async logAction(data: Partial<AuditLog>): Promise<AuditLog> {
    const id = `audit_${Date.now()}`;
    const newLog: AuditLog = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
    } as AuditLog;
    await this.repo.create(id, newLog);
    return newLog;
  }
}

export const auditService = new AuditService();
