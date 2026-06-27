import { RecommendationRepository } from '@/repositories/RecommendationRepository';
import { Recommendation } from '@/types';

export class RecommendationService {
  private repo = new RecommendationRepository();

  async getRecommendations(organizationId: string): Promise<Recommendation[]> {
    return this.repo.getAll();
  }

  async markAsViewed(id: string): Promise<void> {
    await this.repo.update(id, { status: 'VIEWED' });
  }

  async markAsActionTaken(id: string): Promise<void> {
    await this.repo.update(id, { status: 'ACTION_TAKEN' });
  }

  async dismiss(id: string): Promise<void> {
    await this.repo.update(id, { status: 'DISMISSED' });
  }
  
  async generateMockRecommendations(): Promise<void> {
    // Just for demo purposes
  }
}

export const recommendationService = new RecommendationService();
