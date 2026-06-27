import { BaseRepository } from '@/repositories/BaseRepository';
import { Recommendation } from '@/types';

export class RecommendationRepository extends BaseRepository<Recommendation> {
  constructor() {
    super('recommendations', 'id');
  }
}
