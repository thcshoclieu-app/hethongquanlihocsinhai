import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useSubscription, useFeatureFlag } from '@/hooks/useTenantHooks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export function SubscriptionCard() {
  const { subscription } = useSubscription();
  const { featureFlags } = useFeatureFlag();

  if (!subscription) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Gói dịch vụ (Subscription)</CardTitle>
            <CardDescription>Thông tin gói đang sử dụng và gia hạn</CardDescription>
          </div>
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">GÓI {subscription.planId}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <div>
            <p className="text-sm font-medium text-slate-500">Ngày hết hạn</p>
            <p className="font-semibold text-slate-900 dark:text-slate-100">{new Date(subscription.expireDate).toLocaleDateString('vi-VN')}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Trạng thái</p>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
              {subscription.status}
            </Badge>
          </div>
          <Button variant="outline">Nâng cấp gói</Button>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Tính năng hiện có</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
            {featureFlags && Object.entries(featureFlags.features).map(([key, value]) => (
              value ? (
                <div key={key} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
              ) : null
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
