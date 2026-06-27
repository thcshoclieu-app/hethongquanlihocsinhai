export interface AuditLogEntry {
  logId: string;
  entityId: string; // e.g. invoiceId
  entityType: 'invoice' | 'payment' | 'billing_rule';
  action: 'create' | 'update' | 'delete' | 'pay' | 'refund' | 'cancel' | 'issue';
  changes: Record<string, any>; // old and new values
  performedBy: string;
  timestamp: string;
}

export class AuditLogService {
  static log(entry: Omit<AuditLogEntry, 'logId' | 'timestamp'>) {
    const logId = `log_${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    const newLog: AuditLogEntry = {
      ...entry,
      logId,
      timestamp
    };

    // In a real app, save to database
    console.log('[Audit Log]', newLog);
  }
}
