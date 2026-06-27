import { AiConfigurationRepository } from '@/repositories/AiConfigurationRepository';
import { AiConfiguration } from '@/types';

export class InsightService {
  private configRepo = new AiConfigurationRepository();

  async getConfiguration(organizationId: string): Promise<AiConfiguration | null> {
    const all = await this.configRepo.getAll();
    return all.find(c => c.organizationId === organizationId) || null;
  }

  async updateConfiguration(id: string, data: Partial<AiConfiguration>): Promise<void> {
    await this.configRepo.update(id, data);
  }
}

export const insightService = new InsightService();
