import { BaseRepository } from '@/repositories/BaseRepository';
import { RiskScore } from '@/types';

export class RiskScoreRepository extends BaseRepository<RiskScore> {
  constructor() {
    super('riskScores', 'id');
  }
}
