import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Webhook, Plus, Trash2, Activity, PlayCircle } from 'lucide-react';
import { useWebhooks } from '../hooks/useDeveloperPortal';
import { webhookService } from '../services/WebhookService';
import { useTenantStore } from '@/store/tenantStore';

export default function WebhookManager() {
  const { webhooks, isLoading, reload } = useWebhooks();
  const { organizationId } = useTenantStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  const handleCreate = async () => {
    if (!newUrl.trim() || !organizationId) return;
    setIsCreating(true);
    await webhookService.createWebhook({
      organizationId,
      name: 'New Webhook',
      url: newUrl,
      events: ['attendance.created', 'invoice.paid'], // Demo default
      secret: `whsec_${Math.random().toString(36).substr(2, 16)}`
    });
    setNewUrl('');
    setIsCreating(false);
    reload();
  };

  const handleToggle = async (id: string, currentStatus: string) => {
    await webhookService.toggleWebhook(id, currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE');
    reload();
  };

  const handleDelete = async (id: string) => {
    await webhookService.deleteWebhook(id);
    reload();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Webhook className="text-emerald-500" /> Webhook Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Đăng ký URL để nhận sự kiện thời gian thực từ hệ thống</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thêm Webhook Endpoint</CardTitle>
          <CardDescription>URL phải sử dụng HTTPS và phản hồi 2xx trong vòng 5 giây.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input 
              placeholder="https://your-domain.com/webhooks/edtech" 
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={handleCreate} disabled={isCreating || !newUrl.trim()} className="gap-2">
              <Plus size={16} /> Thêm Endpoint
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {isLoading ? (
          <div>Đang tải...</div>
        ) : webhooks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-slate-500">
              Chưa có Webhook nào được cấu hình.
            </CardContent>
          </Card>
        ) : webhooks.map(wh => (
          <Card key={wh.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 break-all">{wh.url}</h3>
                    <Badge variant={wh.status === 'ACTIVE' ? 'default' : 'secondary'} 
                           className={wh.status === 'ACTIVE' ? 'bg-emerald-500' : ''}>
                      {wh.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-slate-500 mb-1 block">Sự kiện đã đăng ký:</span>
                    <div className="flex flex-wrap gap-2">
                      {wh.events.map(ev => <Badge key={ev} variant="outline" className="bg-slate-50">{ev}</Badge>)}
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-slate-500 block mb-1">Webhook Secret (dùng để xác minh chữ ký)</span>
                    <code className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded block w-fit">
                      {wh.secret}
                    </code>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 min-w-[140px]">
                  <Button variant="outline" size="sm" className="gap-2 justify-start" onClick={() => handleToggle(wh.id, wh.status)}>
                    {wh.status === 'ACTIVE' ? <Activity size={14} className="text-amber-500" /> : <PlayCircle size={14} className="text-emerald-500" />}
                    {wh.status === 'ACTIVE' ? 'Tạm dừng' : 'Kích hoạt'}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 justify-start">
                    <Activity size={14} /> Xem Logs
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 justify-start text-rose-500 hover:text-rose-600" onClick={() => handleDelete(wh.id)}>
                    <Trash2 size={14} /> Xóa Webhook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
