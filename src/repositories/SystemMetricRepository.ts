import { BaseRepository } from '@/repositories/BaseRepository';
import { SystemMetric } from '@/types';

export class SystemMetricRepository extends BaseRepository<SystemMetric> {
  constructor() {
    super('systemMetrics', 'id');
  }
}
