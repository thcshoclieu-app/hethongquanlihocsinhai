import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useOrganization } from '@/hooks/useTenantHooks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function BrandingSettings() {
  const { currentOrganization } = useOrganization();

  if (!currentOrganization) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thương hiệu & Tên miền (Branding & Domain)</CardTitle>
        <CardDescription>Cấu hình màu sắc, logo và custom domain</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tên ứng dụng hiển thị</label>
            <Input defaultValue={currentOrganization.branding?.appName} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Màu chủ đạo (Primary Color)</label>
            <div className="flex gap-2">
              <Input type="color" className="w-16 h-10 p-1" defaultValue={currentOrganization.branding?.primaryColor} />
              <Input defaultValue={currentOrganization.branding?.primaryColor} />
            </div>
          </div>
          <div className="space-y-2 col-span-2">
            <label className="text-sm font-medium">Custom Domain</label>
            <Input defaultValue={currentOrganization.domain} placeholder="vd: app.trungtamcuaban.com" />
            <p className="text-xs text-slate-500 mt-1">Yêu cầu gói Enterprise. Trỏ CNAME về cname.schoolmanager.vn</p>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button>Lưu thương hiệu</Button>
        </div>
      </CardContent>
    </Card>
  );
}
