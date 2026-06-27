import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useOrganization } from '@/hooks/useTenantHooks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function OrganizationSettings() {
  const { currentOrganization } = useOrganization();

  if (!currentOrganization) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin trung tâm (Organization)</CardTitle>
        <CardDescription>Cập nhật tên, địa chỉ và thông tin liên hệ</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tên trung tâm</label>
            <Input defaultValue={currentOrganization.name} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tên viết tắt</label>
            <Input defaultValue={currentOrganization.shortName} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email liên hệ</label>
            <Input defaultValue={currentOrganization.email} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Số điện thoại</label>
            <Input defaultValue={currentOrganization.phone} />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button>Lưu thay đổi</Button>
        </div>
      </CardContent>
    </Card>
  );
}
