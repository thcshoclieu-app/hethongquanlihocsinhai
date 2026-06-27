import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useManualAttendance } from '../hooks/useManualAttendance';
import { Spinner } from '@/components/ui/spinner';
import { Attendance } from '@/types';

interface EditAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  record: Attendance | null;
}

export function EditAttendanceModal({ isOpen, onClose, onSuccess, record }: EditAttendanceModalProps) {
  const [status, setStatus] = useState(record?.status || 'present');
  const [note, setNote] = useState(record?.note || '');
  const [reason, setReason] = useState('');
  const { updateAttendance, isSubmitting } = useManualAttendance();

  useEffect(() => {
    if (record) {
      setStatus(record.status);
      setNote(record.note || '');
      setReason('');
    }
  }, [record]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!record) return;
    if (!reason) {
      alert('Vui lòng nhập lý do chỉnh sửa');
      return;
    }
    
    const result = await updateAttendance(record.attendanceId, {
      status: status as any,
      note
    }, reason);

    if (result.success) {
      onSuccess();
      onClose();
    } else {
      alert(result.message);
    }
  };

  if (!record) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa điểm danh</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right font-medium text-sm leading-none">
                Học sinh
              </label>
              <div className="col-span-3 text-sm">{record.studentId}</div>
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
                  <SelectItem value="absent">Vắng mặt</SelectItem>
                  <SelectItem value="leave">Nghỉ phép</SelectItem>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="reason" className="text-right text-red-500 text-sm font-medium leading-none">
                Lý do sửa *
              </label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="col-span-3 border-red-200 focus-visible:ring-red-500"
                placeholder="Bắt buộc nhập lý do"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner size="sm" className="mr-2" /> : null}
              Cập nhật
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
