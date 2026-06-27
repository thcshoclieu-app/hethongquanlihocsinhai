import { IChannelProvider, SendResult } from './IChannelProvider';
import { SystemNotification } from '@/types';

export class SmsProvider implements IChannelProvider {
  name = 'SMS';

  async send(notification: SystemNotification): Promise<SendResult> {
    console.log(`[SmsProvider] Sending SMS to ${notification.receiverId}: ${notification.title}`);
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, deliveredAt: new Date().toISOString() };
  }
}

export class PushProvider implements IChannelProvider {
  name = 'PUSH';

  async send(notification: SystemNotification): Promise<SendResult> {
    console.log(`[PushProvider] Sending Push to ${notification.receiverId}: ${notification.title}`);
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true, deliveredAt: new Date().toISOString() };
  }
}

export class ZaloProvider implements IChannelProvider {
  name = 'ZALO_OA';

  async send(notification: SystemNotification): Promise<SendResult> {
    console.log(`[ZaloProvider] Sending Zalo msg to ${notification.receiverId}: ${notification.title}`);
    await new Promise(resolve => setTimeout(resolve, 400));
    return { success: true, deliveredAt: new Date().toISOString() };
  }
}

export class WebhookProvider implements IChannelProvider {
  name = 'WEBHOOK';

  async send(notification: SystemNotification): Promise<SendResult> {
    console.log(`[WebhookProvider] Sending Webhook for ${notification.receiverId}: ${notification.title}`);
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true, deliveredAt: new Date().toISOString() };
  }
}

export class InAppProvider implements IChannelProvider {
  name = 'IN_APP';

  async send(notification: SystemNotification): Promise<SendResult> {
    console.log(`[InAppProvider] Emitting InApp notification to ${notification.receiverId}: ${notification.title}`);
    // In a real app this would use WebSockets or just Firestore observer which we already have.
    // So writing to Firestore is already done, we just mark it as delivered.
    await new Promise(resolve => setTimeout(resolve, 100));
    return { success: true, deliveredAt: new Date().toISOString() };
  }
}
