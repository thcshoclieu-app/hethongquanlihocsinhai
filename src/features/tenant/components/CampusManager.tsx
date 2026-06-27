import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCampus } from '@/hooks/useTenantHooks';
import { Button } from '@/components/ui/button';
import { Plus, MapPin } from 'lucide-react';

export function CampusManager() {
  const { campuses } = useCampus();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Quản lý Cơ sở (Campuses)</CardTitle>
          <CardDescription>Danh sách các chi nhánh của trung tâm</CardDescription>
        </div>
        <Button size="sm" className="gap-2"><Plus size={16}/> Thêm cơ sở</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campuses.map(campus => (
            <div key={campus.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">{campus.name} ({campus.code})</h4>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={14}/> {campus.address}</p>
              </div>
              <Button variant="outline" size="sm">Chỉnh sửa</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
