import { SystemAlertRepository } from '@/repositories/SystemAlertRepository';
import { SystemAlert } from '@/types';

export class AlertService {
  private repo = new SystemAlertRepository();

  async getAlerts(): Promise<SystemAlert[]> {
    return this.repo.getAll();
  }

  async createAlert(data: Partial<SystemAlert>): Promise<SystemAlert> {
    const id = `alert_${Date.now()}`;
    const newAlert: SystemAlert = {
      ...data,
      id,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    } as SystemAlert;
    await this.repo.create(id, newAlert);
    return newAlert;
  }

  async resolveAlert(id: string): Promise<void> {
    await this.repo.update(id, {
      status: 'RESOLVED',
      resolvedAt: new Date().toISOString()
    });
  }
}

export const alertService = new AlertService();
