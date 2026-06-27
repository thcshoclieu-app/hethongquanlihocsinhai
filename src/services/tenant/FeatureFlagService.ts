import { FeatureFlag } from '@/types';

export class FeatureFlagService {
  static async getFeatureFlags(planId: string): Promise<FeatureFlag> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `ff_${planId}`,
          planId,
          features: {
            aiRecognition: planId === 'PRO' || planId === 'ENTERPRISE',
            analytics: planId === 'PRO' || planId === 'ENTERPRISE',
            apiAccess: planId === 'ENTERPRISE',
            webhooks: planId === 'ENTERPRISE',
            customDomain: planId === 'ENTERPRISE'
          }
        });
      }, 300);
    });
  }
}
