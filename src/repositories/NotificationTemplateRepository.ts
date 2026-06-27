import { NotificationTemplate } from '@/types';
import { BaseRepository } from '@/repositories/BaseRepository';

export class NotificationTemplateRepository extends BaseRepository<NotificationTemplate> {
  constructor() {
    super('notificationTemplates', 'id');
  }
}
