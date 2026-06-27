import { SystemNotification } from '@/types';

export interface SendResult {
  success: boolean;
  errorReason?: string;
  deliveredAt?: string;
}

export interface IChannelProvider {
  name: string;
  send(notification: SystemNotification): Promise<SendResult>;
}
