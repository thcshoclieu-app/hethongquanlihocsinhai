import { SystemMetricRepository } from '@/repositories/SystemMetricRepository';
import { SystemMetric } from '@/types';

export class MonitoringService {
  private repo = new SystemMetricRepository();

  async getMetrics(): Promise<SystemMetric[]> {
    return this.repo.getAll();
  }

  async recordMetric(data: Partial<SystemMetric>): Promise<SystemMetric> {
    const id = `metric_${Date.now()}`;
    const newMetric: SystemMetric = {
      ...data,
      id,
      timestamp: new Date().toISOString(),
    } as SystemMetric;
    await this.repo.create(id, newMetric);
    return newMetric;
  }
}

export const monitoringService = new MonitoringService();
