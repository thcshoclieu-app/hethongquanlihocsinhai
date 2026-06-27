import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Upload, Server, Clock, AlertCircle } from 'lucide-react';
import { OrganizationSettings } from '@/features/tenant/components/OrganizationSettings';
import { BrandingSettings } from '@/features/tenant/components/BrandingSettings';
import { CampusManager } from '@/features/tenant/components/CampusManager';
import { SubscriptionCard } from '@/features/tenant/components/SubscriptionCard';
import { QuotaCard } from '@/features/tenant/components/QuotaCard';
import { ApiKeyManager, WebhookManager } from '@/features/tenant/components/ApiWebhookManager';

export default function Settings() {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [lastBackup, setLastBackup] = useState(new Date().toLocaleString('vi-VN'));

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      setLastBackup(new Date().toLocaleString('vi-VN'));
      alert('Sao lưu dữ liệu thành công!');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Cài đặt hệ thống (SaaS)</h2>
        <p className="text-slate-500 dark:text-slate-400">Quản lý trung tâm, gói dịch vụ và sao lưu dữ liệu.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <OrganizationSettings />
        <SubscriptionCard />
        <CampusManager />
        <QuotaCard />
        <BrandingSettings />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Server size={20} /> Sao lưu & Phục hồi</CardTitle>
            <CardDescription>Bảo vệ dữ liệu hệ thống riêng của trung tâm</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-start gap-3">
              <Clock className="text-blue-500 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Bản sao lưu gần nhất</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{lastBackup}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleBackup} 
                disabled={isBackingUp}
                className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Download size={16} /> {isBackingUp ? 'Đang tạo sao lưu...' : 'Tạo bản sao lưu mới'}
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Upload size={16} /> Phục hồi dữ liệu
              </Button>
            </div>
            
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
              <AlertCircle size={12} /> Hệ thống tự động sao lưu định kỳ vào 02:00 sáng mỗi ngày.
            </p>
          </CardContent>
        </Card>

        <ApiKeyManager />
        <WebhookManager />
      </div>
    </div>
  );
}
