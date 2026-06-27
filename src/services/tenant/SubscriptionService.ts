import { Subscription } from '@/types';

export class SubscriptionService {
  static async getCurrentSubscription(organizationId: string): Promise<Subscription> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'sub_1',
          organizationId,
          planId: 'PRO',
          price: 1500000,
          renewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          expireDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'ACTIVE'
        });
      }, 300);
    });
  }
}
