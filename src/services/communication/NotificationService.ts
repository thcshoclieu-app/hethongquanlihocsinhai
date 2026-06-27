import { SystemNotificationRepository } from '@/repositories/SystemNotificationRepository';
import { NotificationCampaignRepository } from '@/repositories/NotificationCampaignRepository';
import { SystemNotification, NotificationCampaign } from '@/types';
import { QueueService } from './QueueService';
import { EmailProvider } from './providers/EmailProvider';
import { SmsProvider, PushProvider, ZaloProvider, WebhookProvider, InAppProvider } from './providers/OtherProviders';
import { TemplateService } from './TemplateService';

export class NotificationService {
  private repo = new SystemNotificationRepository();
  private campaignRepo = new NotificationCampaignRepository();
  private queueService = new QueueService();
  private templateService = new TemplateService();

  constructor() {
    this.queueService.registerProvider(new EmailProvider());
    this.queueService.registerProvider(new SmsProvider());
    this.queueService.registerProvider(new PushProvider());
    this.queueService.registerProvider(new ZaloProvider());
    this.queueService.registerProvider(new WebhookProvider());
    this.queueService.registerProvider(new InAppProvider());
    
    // Start interval queue processing simulation
    setInterval(() => {
      this.queueService.processQueue();
    }, 10000); // Check queue every 10s
  }

  async send(data: Partial<SystemNotification>): Promise<void> {
    const id = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    
    const notification: SystemNotification = {
      ...data,
      id,
      status: 'QUEUED',
      createdAt: new Date().toISOString(),
      retryCount: 0
    } as SystemNotification;

    await this.repo.create(id, notification);
    
    // Immediately trigger queue process if it's high priority
    if (notification.priority === 'CRITICAL' || notification.priority === 'HIGH') {
      this.queueService.processQueue();
    }
  }

  async broadcast(
    campaignData: Partial<NotificationCampaign>, 
    receivers: string[], 
    variablesMap: Record<string, Record<string, string>> = {}
  ): Promise<void> {
    const campaignId = `camp_${Date.now()}`;
    await this.campaignRepo.create(campaignId, {
      ...campaignData,
      id: campaignId,
      status: 'SENDING',
      createdAt: new Date().toISOString(),
      sentCount: 0,
      readCount: 0,
      failedCount: 0
    } as NotificationCampaign);

    for (const receiverId of receivers) {
      let title = campaignData.title || '';
      let message = campaignData.message || '';

      const vars = variablesMap[receiverId];
      if (vars) {
        title = this.templateService.compile(title, vars);
        message = this.templateService.compile(message, vars);
      }

      for (const channel of campaignData.channels || []) {
        await this.send({
          organizationId: campaignData.organizationId,
          campusId: campaignData.campusId,
          campaignId: campaignId,
          senderId: campaignData.createdBy,
          receiverId: receiverId,
          channel: channel as any,
          category: campaignData.category as any,
          priority: 'NORMAL',
          title,
          message
        });
      }
    }
    
    await this.campaignRepo.update(campaignId, { status: 'COMPLETED' });
  }

  async getMyNotifications(receiverId: string): Promise<SystemNotification[]> {
    return this.repo.getByReceiver(receiverId);
  }

  async markAsRead(id: string): Promise<void> {
    await this.repo.markAsRead(id);
  }
}

export const notificationService = new NotificationService();
