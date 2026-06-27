import { TenantInfoRepository } from '@/repositories/TenantInfoRepository';
import { TenantInfo } from '@/types';

export class TenantService {
  private repo = new TenantInfoRepository();

  async getTenants(): Promise<TenantInfo[]> {
    return this.repo.getAll();
  }

  async createTenant(data: Partial<TenantInfo>): Promise<TenantInfo> {
    const id = `org_${Date.now()}`;
    const newTenant: TenantInfo = {
      ...data,
      id,
      status: 'ACTIVE',
      userCount: 0,
      studentCount: 0,
      storageUsed: 0,
      createdAt: new Date().toISOString(),
    } as TenantInfo;
    await this.repo.create(id, newTenant);
    return newTenant;
  }

  async toggleStatus(id: string, status: 'ACTIVE' | 'SUSPENDED' | 'MAINTENANCE'): Promise<void> {
    await this.repo.update(id, { status });
  }
}

export const tenantService = new TenantService();
