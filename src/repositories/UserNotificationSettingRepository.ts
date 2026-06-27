import { UserNotificationSetting } from '@/types';
import { BaseRepository } from '@/repositories/BaseRepository';
import { where } from 'firebase/firestore';

export class UserNotificationSettingRepository extends BaseRepository<UserNotificationSetting> {
  constructor() {
    super('userNotificationSettings', 'id');
  }

  async getByUserId(userId: string): Promise<UserNotificationSetting | null> {
    const settings = await this.getAll([where('userId', '==', userId)]);
    return settings.length > 0 ? settings[0] : null;
  }
}
