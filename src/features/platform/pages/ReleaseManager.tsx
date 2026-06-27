import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, GitMerge, RotateCcw, Play } from 'lucide-react';

export default function ReleaseManager() {
  const releases = [
    { version: 'v2.4.0', status: 'BETA', rollout: 15, date: 'Today, 09:00', notes: 'AI Recognition model upgrade' },
    { version: 'v2.3.5', status: 'STABLE', rollout: 100, date: 'Jun 15, 2026', notes: 'Bug fixes for payment gateway' },
    { version: 'v2.3.0', status: 'DEPRECATED', rollout: 0, date: 'May 01, 2026', notes: 'Old API version' },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <GitMerge className="text-blue-600" /> Release Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Canary deployments & Feature Flags</p>
        </div>
        <Button className="gap-2"><Play size={16} /> Deploy New Version</Button>
      </div>

      <div className="space-y-4">
        {releases.map(r => (
          <Card key={r.version}>
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-xl">{r.version}</h3>
                  <Badge variant={r.status === 'STABLE' ? 'default' : r.status === 'BETA' ? 'secondary' : 'outline'}
                         className={r.status === 'STABLE' ? 'bg-emerald-500' : r.status === 'BETA' ? 'bg-amber-500 text-white' : ''}>
                    {r.status}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">{r.notes}</p>
                <div className="text-xs text-slate-500">Released: {r.date}</div>
              </div>
              
              <div className="w-full md:w-1/3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Rollout</span>
                  <span className="font-bold">{r.rollout}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div className={`h-2 rounded-full ${r.status === 'STABLE' ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${r.rollout}%` }}></div>
                </div>
                {r.status === 'BETA' && (
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">Increase 10%</Button>
                    <Button variant="outline" size="sm" className="flex-1 text-rose-500 gap-1"><RotateCcw size={14}/> Rollback</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Feature Flags</CardTitle>
          <CardDescription>Quản lý bật/tắt tính năng theo tổ chức</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <div className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium">FF_NEW_DASHBOARD</p>
                <p className="text-sm text-slate-500">Giao diện Dashboard mới</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">100% Rollout</span>
                <Button variant="outline" size="sm">Cấu hình</Button>
              </div>
            </div>
            <div className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium">FF_BETA_REPORTS</p>
                <p className="text-sm text-slate-500">Báo cáo nâng cao (Beta)</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-amber-600">Selected Orgs Only</span>
                <Button variant="outline" size="sm">Cấu hình</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
