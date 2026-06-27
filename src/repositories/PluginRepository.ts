import { BaseRepository } from '@/repositories/BaseRepository';
import { Plugin } from '@/types';

export class PluginRepository extends BaseRepository<Plugin> {
  constructor() {
    super('plugins', 'id');
  }
}
