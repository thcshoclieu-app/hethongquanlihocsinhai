import { ApiKeyRepository } from '@/repositories/ApiKeyRepository';
import { ApiKey } from '@/types';

export class ApiKeyService {
  private repo = new ApiKeyRepository();

  async getApiKeys(organizationId: string): Promise<ApiKey[]> {
    const all = await this.repo.getAll();
    return all.filter(k => k.organizationId === organizationId);
  }

  async createApiKey(data: Partial<ApiKey>): Promise<ApiKey> {
    const id = `key_${Date.now()}`;
    const newKey: ApiKey = {
      ...data,
      id,
      publicKey: `pk_${Math.random().toString(36).substr(2, 9)}`,
      secretKeyPreview: 'sk_***' + Math.random().toString(36).substr(2, 4),
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    } as ApiKey;
    await this.repo.create(id, newKey);
    return newKey;
  }

  async revokeApiKey(id: string): Promise<void> {
    await this.repo.update(id, { status: 'REVOKED' });
  }
}

export const apiKeyService = new ApiKeyService();
