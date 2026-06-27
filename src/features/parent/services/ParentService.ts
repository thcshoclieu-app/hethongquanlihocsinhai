import { Parent, ParentNotification } from '@/types';
import { ParentRepository } from '@/repositories/ParentRepository';
import { NotificationRepository } from '@/repositories/NotificationRepository';

export class ParentService {
  private parentRepo = new ParentRepository();
  private notifRepo = new NotificationRepository();

  async getParentProfile(parentId: string): Promise<Parent | null> {
    return this.parentRepo.getById(parentId);
  }

  async updateParentProfile(parentId: string, data: Partial<Parent>): Promise<void> {
    await this.parentRepo.update(parentId, data);
  }

  async getNotifications(parentId: string): Promise<ParentNotification[]> {
    return this.notifRepo.getByParent(parentId);
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await this.notifRepo.markAsRead(notificationId);
  }
}
