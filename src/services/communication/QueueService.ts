import { SystemNotification } from '@/types';
import { SystemNotificationRepository } from '@/repositories/SystemNotificationRepository';
import { IChannelProvider } from './providers/IChannelProvider';

export class QueueService {
  private repo = new SystemNotificationRepository();
  private providers: Map<string, IChannelProvider> = new Map();
  private isProcessing = false;
  private maxRetries = 3;

  registerProvider(provider: IChannelProvider) {
    this.providers.set(provider.name, provider);
  }

  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      const queued = await this.repo.getQueuedNotifications();
      
      // Sort by priority
      const priorityMap: Record<string, number> = {
        'CRITICAL': 4,
        'HIGH': 3,
        'NORMAL': 2,
        'LOW': 1
      };
      
      queued.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);

      for (const notification of queued) {
        await this.processNotification(notification);
      }
    } catch (error) {
      console.error("Queue processing error", error);
    } finally {
      this.isProcessing = false;
    }
  }

  async processNotification(notification: SystemNotification) {
    const provider = this.providers.get(notification.channel);
    
    if (!provider) {
      await this.repo.update(notification.id, { 
        status: 'FAILED', 
        errorReason: `No provider found for channel ${notification.channel}`
      });
      return;
    }

    try {
      await this.repo.update(notification.id, { status: 'SENDING' });
      
      const result = await provider.send(notification);
      
      if (result.success) {
        await this.repo.update(notification.id, { 
          status: notification.channel === 'IN_APP' ? 'DELIVERED' : 'SENT', 
          sentAt: new Date().toISOString() 
        });
        
        // Log to communicationLogs (simplified by just console log here or could use a repository)
        console.log(`[CommunicationLog] Delivered ${notification.id} via ${notification.channel}`);
      } else {
        await this.handleFailure(notification, result.errorReason);
      }
    } catch (error: any) {
      await this.handleFailure(notification, error.message);
    }
  }

  private async handleFailure(notification: SystemNotification, reason?: string) {
    if (notification.retryCount < this.maxRetries) {
      await this.repo.update(notification.id, { 
        status: 'QUEUED', 
        errorReason: reason,
        retryCount: notification.retryCount + 1
      });
    } else {
      await this.repo.update(notification.id, { 
        status: 'FAILED', 
        errorReason: reason
      });
    }
  }
}
