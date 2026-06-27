import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Key, Globe, EyeOff, Eye } from 'lucide-react';
import { useOrganization } from '@/hooks/useTenantHooks';

export function ApiKeyManager() {
  const { currentOrganization } = useOrganization();
  const [showSecret, setShowSecret] = useState(false);

  if (!currentOrganization) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Key size={20} /> API Keys</CardTitle>
        <CardDescription>Khóa xác thực cho các ứng dụng bên thứ ba</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Public Key</label>
          <div className="flex gap-2">
            <Input readOnly value={`pk_${currentOrganization.id}_live_xxxxx`} className="font-mono text-sm bg-slate-50 dark:bg-slate-900" />
            <Button variant="outline">Copy</Button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Secret Key</label>
          <div className="flex gap-2">
            <Input 
              type={showSecret ? "text" : "password"} 
              readOnly 
              value={`sk_${currentOrganization.id}_live_yyyyyyyyyyyyyyy`} 
              className="font-mono text-sm bg-slate-50 dark:bg-slate-900" 
            />
            <Button variant="outline" size="icon" onClick={() => setShowSecret(!showSecret)}>
              {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
            <Button variant="outline">Roll</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function WebhookManager() {
  const { currentOrganization } = useOrganization();

  if (!currentOrganization) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Globe size={20} /> Webhooks</CardTitle>
        <CardDescription>Gửi dữ liệu thời gian thực đến hệ thống khác</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Endpoint URL</label>
          <Input placeholder="https://api.yourdomain.com/webhook" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Events</label>
          <div className="flex flex-col gap-2 mt-2">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> student.created</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> attendance.recorded</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked /> payment.success</label>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button>Lưu Webhook</Button>
        </div>
      </CardContent>
    </Card>
  );
}
