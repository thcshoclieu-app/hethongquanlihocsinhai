import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Puzzle, Download, CheckCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePlugins } from '../hooks/useDeveloperPortal';
import { pluginService } from '../services/PluginService';
import { useTenantStore } from '@/store/tenantStore';

export default function PluginMarketplace() {
  const { marketplacePlugins, installedPlugins, reload } = usePlugins();
  const { organizationId } = useTenantStore();

  const handleInstall = async (plugin: any) => {
    if (!organizationId) return;
    await pluginService.installPlugin(organizationId, plugin);
    reload();
  };

  const handleToggle = async (id: string, currentStatus: string) => {
    await pluginService.togglePlugin(id, currentStatus === 'ENABLED' ? 'DISABLED' : 'ENABLED');
    reload();
  };

  const isInstalled = (pluginId: string) => {
    return installedPlugins.some(p => p.id === pluginId);
  };

  const getInstalledInfo = (pluginId: string) => {
    return installedPlugins.find(p => p.id === pluginId);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Puzzle className="text-purple-500" /> Plugin Marketplace
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Khám phá và cài đặt các tiện ích tích hợp từ đối tác</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input placeholder="Tìm kiếm plugin..." className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplacePlugins.map(plugin => {
          const installedInfo = getInstalledInfo(plugin.id);
          const installed = !!installedInfo;

          return (
            <Card key={plugin.id} className="flex flex-col h-full">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{plugin.name}</CardTitle>
                    <CardDescription className="mt-1">by {plugin.author}</CardDescription>
                  </div>
                  <Badge variant="outline">{plugin.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-6">
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                  {plugin.description}
                </p>
                
                <div className="space-y-4">
                  <div className="text-xs text-slate-500">
                    <p className="font-semibold mb-1">Quyền yêu cầu:</p>
                    <div className="flex flex-wrap gap-1">
                      {plugin.permissions.map(p => <Badge key={p} variant="secondary" className="text-[10px]">{p}</Badge>)}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    {installed ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                          <CheckCircle size={16} /> Đã cài đặt
                        </div>
                        <Button 
                          variant={installedInfo?.status === 'ENABLED' ? 'outline' : 'default'}
                          size="sm"
                          onClick={() => handleToggle(installedInfo!.id, installedInfo!.status)}
                        >
                          {installedInfo?.status === 'ENABLED' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full gap-2" onClick={() => handleInstall(plugin)}>
                        <Download size={16} /> Cài đặt
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
