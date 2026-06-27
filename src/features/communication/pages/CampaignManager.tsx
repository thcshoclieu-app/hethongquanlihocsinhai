import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Send } from 'lucide-react';
import { useCampaigns } from '../hooks/useNotifications';

export default function CampaignManager() {
  const { campaigns, isLoading } = useCampaigns();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Chiến dịch truyền thông</h2>
          <p className="text-slate-500 dark:text-slate-400">Gửi thông báo số lượng lớn theo chiến dịch</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} /> Tạo chiến dịch
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div>Đang tải...</div>
        ) : campaigns.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-slate-500">
              Chưa có chiến dịch nào
            </CardContent>
          </Card>
        ) : campaigns.map(camp => (
          <Card key={camp.id}>
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{camp.name}</h3>
                  <Badge variant={camp.status === 'COMPLETED' ? 'outline' : 'default'} 
                    className={camp.status === 'COMPLETED' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'bg-blue-600'}>
                    {camp.status}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 mb-4">{camp.title}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1"><Users size={14} className="text-slate-400" /> Đối tượng: {camp.targetAudience}</span>
                  <span className="flex items-center gap-1"><Send size={14} className="text-slate-400" /> Đã gửi: {camp.sentCount}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Chi tiết</Button>
                {camp.status === 'DRAFT' && <Button size="sm">Bắt đầu gửi</Button>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
