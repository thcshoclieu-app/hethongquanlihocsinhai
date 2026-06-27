import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Key, Plus, Trash2, Copy, Check } from 'lucide-react';
import { useApiKeys } from '../hooks/useDeveloperPortal';
import { apiKeyService } from '../services/ApiKeyService';
import { useTenantStore } from '@/store/tenantStore';

export default function ApiKeyManager() {
  const { keys, isLoading, reload } = useApiKeys();
  const { organizationId } = useTenantStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newName.trim() || !organizationId) return;
    setIsCreating(true);
    await apiKeyService.createApiKey({
      organizationId,
      name: newName,
      permissions: ['READ_ALL', 'WRITE_ALL'], // Demo default
      rateLimit: 60
    });
    setNewName('');
    setIsCreating(false);
    reload();
  };

  const handleRevoke = async (id: string) => {
    await apiKeyService.revokeApiKey(id);
    reload();
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Key className="text-amber-500" /> API Keys
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Quản lý khóa xác thực cho tích hợp API</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tạo API Key mới</CardTitle>
          <CardDescription>Mỗi key nên được sử dụng cho một ứng dụng/hệ thống riêng biệt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input 
              placeholder="Tên ứng dụng/hệ thống tích hợp..." 
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={handleCreate} disabled={isCreating || !newName.trim()} className="gap-2">
              <Plus size={16} /> Tạo Key
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {isLoading ? (
          <div>Đang tải...</div>
        ) : keys.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-slate-500">
              Chưa có API Key nào được tạo.
            </CardContent>
          </Card>
        ) : keys.map(key => (
          <Card key={key.id}>
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg">{key.name}</h3>
                  <Badge variant={key.status === 'ACTIVE' ? 'default' : 'secondary'} 
                         className={key.status === 'ACTIVE' ? 'bg-emerald-500' : ''}>
                    {key.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                  <div>
                    <span className="font-medium text-slate-500 block mb-1">Public Key</span>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      <code className="text-xs">{key.publicKey}</code>
                      <button onClick={() => copyToClipboard(key.publicKey, key.id + 'pk')} className="text-slate-400 hover:text-slate-700">
                        {copiedId === key.id + 'pk' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-slate-500 block mb-1">Secret Key (Preview)</span>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      <code className="text-xs">{key.secretKeyPreview}</code>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {key.status === 'ACTIVE' && (
                  <Button variant="destructive" size="sm" onClick={() => handleRevoke(key.id)} className="gap-2">
                    <Trash2 size={16} /> Thu hồi
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
