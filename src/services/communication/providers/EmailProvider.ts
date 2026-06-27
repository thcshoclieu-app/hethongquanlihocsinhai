import { IChannelProvider, SendResult } from './IChannelProvider';
import { SystemNotification } from '@/types';

export class EmailProvider implements IChannelProvider {
  name = 'EMAIL';

  async send(notification: SystemNotification): Promise<SendResult> {
    console.log(`[EmailProvider] Sending email to ${notification.receiverId}: ${notification.title}`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate success
    return {
      success: true,
      deliveredAt: new Date().toISOString()
    };
  }
}
