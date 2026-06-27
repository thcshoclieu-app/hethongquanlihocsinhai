import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AuditViewer() {
  const mockLogs = [
    { id: '1', time: '10:05:22', user: 'admin@platform', org: 'SYSTEM', action: 'ENABLE_FEATURE_FLAG', resource: 'FF_PAYMENT_V2', status: 'SUCCESS' },
    { id: '2', time: '09:45:10', user: 'owner@alpha', org: 'ORG_1', action: 'CREATE_API_KEY', resource: 'API_KEY_MOMO', status: 'SUCCESS' },
    { id: '3', time: '08:30:00', user: 'system', org: 'ORG_3', action: 'SUSPEND_TENANT', resource: 'TENANT_ORG_3', status: 'SUCCESS' },
    { id: '4', time: '08:15:45', user: 'unknown', org: 'SYSTEM', action: 'ADMIN_LOGIN', resource: 'DASHBOARD', status: 'FAILED' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Key className="text-slate-600" /> Audit Center
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Nhật ký truy cập và thao tác hệ thống (Bảo lưu 90 ngày)</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Security Logs</CardTitle>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Tìm user, action, resource..." className="pl-9 h-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockLogs.map(log => (
              <div key={log.id} className="p-4 flex items-center hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <div className="w-24 text-sm text-slate-500">{log.time}</div>
                <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="text-sm font-medium">{log.user}</p>
                    <p className="text-xs text-slate-500">{log.org}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded inline-block">{log.action}</p>
                    <p className="text-xs text-slate-500 mt-1">{log.resource}</p>
                  </div>
                  <div>
                    <Badge variant={log.status === 'SUCCESS' ? 'outline' : 'destructive'} 
                           className={log.status === 'SUCCESS' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : ''}>
                      {log.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
