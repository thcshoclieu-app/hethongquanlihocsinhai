import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { notificationService } from '@/services/communication/NotificationService';
import { useAuthStore } from '@/store';
import { useTenantStore } from '@/store/tenantStore';

export default function BroadcastDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { user } = useAuthStore();
  const { organizationId, campusId } = useTenantStore();
  
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('ALL');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    try {
      await notificationService.broadcast({
        organizationId,
        campusId,
        name: 'Gửi thông báo nhanh',
        title,
        message,
        targetAudience: target as any,
        channels: ['IN_APP', 'EMAIL'], // Default channels
        createdBy: user?.uid || 'system',
        category: 'ANNOUNCEMENT'
      }, ['parent1', 'parent2']); // Mocking receivers
      
      onOpenChange(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gửi thông báo mới (Broadcast)</DialogTitle>
          <DialogDescription>Gửi tin nhắn đa kênh tới người dùng.</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Đối tượng nhận</label>
            <select 
              className="w-full h-9 rounded-md border border-slate-200 px-3 py-1 text-sm bg-transparent"
              value={target}
              onChange={e => setTarget(e.target.value)}
            >
              <option value="ALL">Toàn trung tâm</option>
              <option value="CAMPUS">Toàn chi nhánh hiện tại</option>
              <option value="CLASS">Học sinh trong lớp</option>
              <option value="TEACHER">Tất cả Giáo viên</option>
              <option value="PARENT">Tất cả Phụ huynh</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tiêu đề</label>
            <Input 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="VD: Thông báo nghỉ lễ 30/4" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Nội dung</label>
            <Textarea 
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              placeholder="Nhập nội dung thông báo..." 
              rows={5} 
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
          <Button onClick={handleSend} disabled={isSending || !title || !message}>
            {isSending ? 'Đang gửi...' : 'Gửi thông báo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
