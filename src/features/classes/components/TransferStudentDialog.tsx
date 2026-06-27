import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useClasses } from '@/hooks/useClasses';

interface TransferStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  currentClassId: string;
  onTransfer: (toClassId: string, reason: string) => void;
}

export function TransferStudentDialog({ open, onOpenChange, studentName, currentClassId, onTransfer }: TransferStudentDialogProps) {
  const { classes } = useClasses();
  const [targetClass, setTargetClass] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (targetClass && reason) {
      onTransfer(targetClass, reason);
      onOpenChange(false);
    }
  };

  const availableClasses = classes.filter(c => c.classId !== currentClassId && c.status === 'active' || c.status === 'enrolling');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chuyển lớp cho {studentName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Lớp mới</label>
            <Select onValueChange={setTargetClass} value={targetClass}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn lớp mới" />
              </SelectTrigger>
              <SelectContent>
                {availableClasses.map(cls => (
                  <SelectItem key={cls.classId} value={cls.classId}>
                    {cls.className} ({cls.studentCount}/{cls.maxCapacity})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Lý do chuyển lớp</label>
            <Input 
              placeholder="Nhập lý do chuyển lớp" 
              value={reason} 
              onChange={e => setReason(e.target.value)} 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
          <Button onClick={handleSubmit} disabled={!targetClass || !reason}>Xác nhận chuyển</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
