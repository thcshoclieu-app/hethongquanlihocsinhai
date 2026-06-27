import { BaseRepository } from '@/repositories/BaseRepository';
import { AuditLog } from '@/types';

export class AuditLogRepository extends BaseRepository<AuditLog> {
  constructor() {
    super('auditLogs', 'id');
  }
}
