import { BaseRepository } from '@/repositories/BaseRepository';
import { AiConfiguration } from '@/types';

export class AiConfigurationRepository extends BaseRepository<AiConfiguration> {
  constructor() {
    super('aiConfigurations', 'id');
  }
}
