import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useManualAttendance } from '../hooks/useManualAttendance';
import { Spinner } from '@/components/ui/spinner';

interface ManualAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  classId: string;
}

export function ManualAttendanceModal({ isOpen, onClose, onSuccess, classId }: ManualAttendanceModalProps) {
  const [studentId, setStudentId] = useState('');
  const [status, setStatus] = useState('present');
  const [note, setNote] = useState('');
  const { createManualAttendance, isSubmitting } = useManualAttendance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) {
      alert('Vui lòng nhập mã học sinh');
      return;
    }
    
    const result = await createManualAttendance({
      studentId,
      classId,
      date: new Date().toISOString().split('T')[0],
      status: status as any,
      note
    });

    if (result.success) {
      setStudentId('');
      setNote('');
      onSuccess();
      onClose();
    } else {
      alert(result.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Điểm danh thủ công</DialogTitle>
          <DialogDescription>
            Điểm danh cho học sinh không nhận diện được bằng camera AI.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="studentId" className="text-right text-sm font-medium leading-none">
                Mã học sinh
              </label>
              <Input
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="col-span-3"
                placeholder="Ví dụ: HS001"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right text-sm font-medium leading-none">
                Trạng thái
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Có mặt</SelectItem>
                  <SelectItem value="late">Đi trễ</SelectItem>
                  <SelectItem value="absent">Vắng mặt (không phép)</SelectItem>
                  <SelectItem value="leave">Nghỉ có phép</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="note" className="text-right text-sm font-medium leading-none">
                Ghi chú
              </label>
              <Input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="col-span-3"
                placeholder="Tùy chọn"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner size="sm" className="mr-2" /> : null}
              Lưu điểm danh
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
