import { SystemNotification } from '@/types';
import { BaseRepository } from '@/repositories/BaseRepository';
import { where, orderBy, query } from 'firebase/firestore';

export class SystemNotificationRepository extends BaseRepository<SystemNotification> {
  constructor() {
    super('notifications', 'id');
  }

  async getByReceiver(receiverId: string): Promise<SystemNotification[]> {
    return this.getAll([
      where('receiverId', '==', receiverId),
      orderBy('createdAt', 'desc')
    ]);
  }

  async markAsRead(id: string): Promise<void> {
    await this.update(id, { status: 'READ', readAt: new Date().toISOString() });
  }

  async getQueuedNotifications(): Promise<SystemNotification[]> {
    return this.getAll([
      where('status', '==', 'QUEUED'),
      orderBy('createdAt', 'asc')
    ]);
  }
}
