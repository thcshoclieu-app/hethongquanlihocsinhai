import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useQuota } from '@/hooks/useTenantHooks';
import { Progress } from '@/components/ui/progress';

export function QuotaCard() {
  const { quota } = useQuota();

  if (!quota) return null;

  const studentPercent = Math.round((quota.currentStudents / quota.studentLimit) * 100);
  const aiPercent = Math.round((quota.currentAiUsage / quota.aiRecognitionLimit) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mức sử dụng (Quota & Usage)</CardTitle>
        <CardDescription>Theo dõi giới hạn tài nguyên của gói</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-700 dark:text-slate-300">Học sinh</span>
            <span className="text-slate-500">{quota.currentStudents} / {quota.studentLimit}</span>
          </div>
          <Progress value={studentPercent} className={studentPercent > 90 ? 'bg-red-100 dark:bg-red-950 [&>div]:bg-red-600' : ''} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-slate-700 dark:text-slate-300">Lượt AI điểm danh (Tháng)</span>
            <span className="text-slate-500">{quota.currentAiUsage} / {quota.aiRecognitionLimit}</span>
          </div>
          <Progress value={aiPercent} className={aiPercent > 90 ? 'bg-red-100 dark:bg-red-950 [&>div]:bg-red-600' : ''} />
        </div>
      </CardContent>
    </Card>
  );
}
