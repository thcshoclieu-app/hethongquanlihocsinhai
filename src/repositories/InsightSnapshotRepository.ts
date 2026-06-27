import { BaseRepository } from '@/repositories/BaseRepository';
import { InsightSnapshot } from '@/types';

export class InsightSnapshotRepository extends BaseRepository<InsightSnapshot> {
  constructor() {
    super('insightSnapshots', 'id');
  }
}
