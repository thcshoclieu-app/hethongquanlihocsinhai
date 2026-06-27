import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useNotificationTemplates } from '../hooks/useNotifications';

export default function TemplateManager() {
  const { templates, isLoading } = useNotificationTemplates();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Quản lý Mẫu thông báo</h2>
          <p className="text-slate-500 dark:text-slate-400">Tạo và quản lý các mẫu tin nhắn (Template Engine)</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} /> Thêm mẫu mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div>Đang tải...</div>
        ) : templates.map(tpl => (
          <Card key={tpl.id} className="flex flex-col">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{tpl.name}</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500"><Edit2 size={14}/></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500"><Trash2 size={14}/></Button>
                </div>
              </div>
              <Badge variant="outline" className="w-fit">{tpl.category}</Badge>
            </CardHeader>
            <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tiêu đề:</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{tpl.titleTemplate}</p>
                
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">Nội dung:</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{tpl.bodyTemplate}</p>
              </div>
              
              <div>
                <p className="text-xs text-slate-500 mb-1">Kênh hỗ trợ:</p>
                <div className="flex flex-wrap gap-1">
                  {tpl.channels.map(c => <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
