import { InsightSnapshotRepository } from '@/repositories/InsightSnapshotRepository';
import { InsightSnapshot } from '@/types';

export class TrendAnalysisService {
  private repo = new InsightSnapshotRepository();

  async getTrends(organizationId: string, type: string, period: string): Promise<InsightSnapshot[]> {
    const all = await this.repo.getAll();
    return all.filter(s => s.type === type && s.period === period);
  }

  async generateMockData(): Promise<void> {
    // Generate some mock snapshots
  }
}

export const trendAnalysisService = new TrendAnalysisService();
