import { ParentNotification } from '@/types';
import { BaseRepository } from '@/repositories/BaseRepository';
import { where } from 'firebase/firestore';

export class NotificationRepository extends BaseRepository<ParentNotification> {
  constructor() {
    super('parentNotifications', 'id');
  }

  async getByParent(parentId: string): Promise<ParentNotification[]> {
    return this.getAll([where('parentId', '==', parentId)]);
  }

  async markAsRead(notificationId: string): Promise<void> {
    await this.update(notificationId, { isRead: true });
  }
}
