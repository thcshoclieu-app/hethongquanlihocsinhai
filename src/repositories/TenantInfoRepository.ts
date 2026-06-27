import { BaseRepository } from '@/repositories/BaseRepository';
import { TenantInfo } from '@/types';

export class TenantInfoRepository extends BaseRepository<TenantInfo> {
  constructor() {
    super('tenantInfos', 'id');
  }
}
