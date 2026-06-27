import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, Webhook, Puzzle, BookOpen, Activity, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useApiKeys, useWebhooks, usePlugins } from '../hooks/useDeveloperPortal';

export default function DeveloperDashboard() {
  const { keys } = useApiKeys();
  const { webhooks } = useWebhooks();
  const { installedPlugins } = usePlugins();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <LinkIcon className="text-blue-600" /> Open Platform
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Tích hợp hệ thống, quản lý API, Webhook và Plugin</p>
        </div>
        <div className="flex gap-2">
          <Link to={ROUTES.DEVELOPER_DOCS}>
            <Button variant="outline" className="gap-2">
              <BookOpen size={16} /> API Documentation
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Key className="text-amber-500" /> API Keys
            </CardTitle>
            <CardDescription>Quản lý truy cập API</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Keys đang hoạt động</span>
              <span className="text-xl font-bold">{keys.filter(k => k.status === 'ACTIVE').length}</span>
            </div>
            <Link to={ROUTES.DEVELOPER_KEYS}>
              <Button className="w-full" variant="outline">Quản lý API Keys</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Webhook className="text-emerald-500" /> Webhooks
            </CardTitle>
            <CardDescription>Lắng nghe sự kiện hệ thống</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Endpoints đã đăng ký</span>
              <span className="text-xl font-bold">{webhooks.length}</span>
            </div>
            <Link to={ROUTES.DEVELOPER_WEBHOOKS}>
              <Button className="w-full" variant="outline">Quản lý Webhooks</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Puzzle className="text-purple-500" /> Plugins
            </CardTitle>
            <CardDescription>Tiện ích tích hợp</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">Plugins đã cài đặt</span>
              <span className="text-xl font-bold">{installedPlugins.length}</span>
            </div>
            <Link to={ROUTES.DEVELOPER_PLUGINS}>
              <Button className="w-full" variant="outline">Marketplace</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="text-blue-500" /> API Usage (24h qua)
          </CardTitle>
          <CardDescription>Thống kê lượng truy cập qua API Gateway</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-slate-500">
            Biểu đồ thống kê API Usage (Mock)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
