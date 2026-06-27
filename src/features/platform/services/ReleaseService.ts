import { ReleaseVersionRepository } from '@/repositories/ReleaseVersionRepository';
import { ReleaseVersion } from '@/types';

export class ReleaseService {
  private repo = new ReleaseVersionRepository();

  async getReleases(): Promise<ReleaseVersion[]> {
    return this.repo.getAll();
  }

  async createRelease(data: Partial<ReleaseVersion>): Promise<ReleaseVersion> {
    const id = `rel_${Date.now()}`;
    const newRelease: ReleaseVersion = {
      ...data,
      id,
      status: 'DRAFT',
      rolloutPercentage: 0,
      createdAt: new Date().toISOString(),
    } as ReleaseVersion;
    await this.repo.create(id, newRelease);
    return newRelease;
  }
}

export const releaseService = new ReleaseService();
