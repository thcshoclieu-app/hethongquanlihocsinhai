import { NotificationCampaign } from '@/types';
import { BaseRepository } from '@/repositories/BaseRepository';

export class NotificationCampaignRepository extends BaseRepository<NotificationCampaign> {
  constructor() {
    super('notificationCampaigns', 'id');
  }
}
