import { BaseRepository } from '@/repositories/BaseRepository';
import { SystemAlert } from '@/types';

export class SystemAlertRepository extends BaseRepository<SystemAlert> {
  constructor() {
    super('systemAlerts', 'id');
  }
}
