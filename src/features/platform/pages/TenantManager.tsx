import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Search, MoreVertical, Ban, RefreshCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function TenantManager() {
  const mockTenants = [
    { id: 'ORG_1', name: 'Alpha School', plan: 'ENTERPRISE', status: 'ACTIVE', users: 1200, storage: '150GB' },
    { id: 'ORG_2', name: 'Beta Academy', plan: 'PRO', status: 'ACTIVE', users: 450, storage: '45GB' },
    { id: 'ORG_3', name: 'Gamma High', plan: 'FREE', status: 'SUSPENDED', users: 50, storage: '2GB' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="text-blue-500" /> Tenant Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Quản lý các tổ chức và trường học trên hệ thống SaaS</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Danh sách Tenant</CardTitle>
            <CardDescription>Cấp phát tài nguyên và kiểm soát truy cập</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Tìm kiếm tên, ID..." className="pl-9 h-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockTenants.map(t => (
              <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                  <div className="col-span-2">
                    <p className="font-medium text-slate-900 dark:text-slate-100">{t.name}</p>
                    <p className="text-xs text-slate-500">ID: {t.id}</p>
                  </div>
                  <div>
                    <Badge variant={t.plan === 'ENTERPRISE' ? 'default' : t.plan === 'PRO' ? 'secondary' : 'outline'}>{t.plan}</Badge>
                  </div>
                  <div>
                    <Badge variant={t.status === 'ACTIVE' ? 'default' : 'destructive'} className={t.status === 'ACTIVE' ? 'bg-emerald-500' : ''}>{t.status}</Badge>
                  </div>
                  <div className="text-sm text-slate-600">
                    <p>{t.users} users</p>
                    <p className="text-xs text-slate-400">{t.storage}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {t.status === 'ACTIVE' ? (
                    <Button variant="outline" size="icon" className="h-8 w-8 text-rose-500" title="Suspend"><Ban size={14} /></Button>
                  ) : (
                    <Button variant="outline" size="icon" className="h-8 w-8 text-emerald-500" title="Reactivate"><RefreshCcw size={14} /></Button>
                  )}
                  <Button variant="outline" size="icon" className="h-8 w-8"><MoreVertical size={14} /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
