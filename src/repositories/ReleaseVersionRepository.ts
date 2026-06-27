import { BaseRepository } from '@/repositories/BaseRepository';
import { ReleaseVersion } from '@/types';

export class ReleaseVersionRepository extends BaseRepository<ReleaseVersion> {
  constructor() {
    super('releaseVersions', 'id');
  }
}
