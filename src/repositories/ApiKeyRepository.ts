import { BaseRepository } from '@/repositories/BaseRepository';
import { ApiKey } from '@/types';

export class ApiKeyRepository extends BaseRepository<ApiKey> {
  constructor() {
    super('apiKeys', 'id');
  }
}
