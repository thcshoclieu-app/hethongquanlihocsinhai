import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';

interface BillingRunDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BillingRunDialog({ isOpen, onClose }: BillingRunDialogProps) {
  const [month, setMonth] = useState('10');
  const [year, setYear] = useState('2023');
  const [target, setTarget] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    // Simulate generation
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tính học phí (Billing Run)</DialogTitle>
        </DialogHeader>
        
        {!isSuccess ? (
          <div className="grid gap-4 py-4">
            <p className="text-sm text-slate-500">
              Hệ thống sẽ tự động tổng hợp số buổi học, điểm danh và các khoản giảm giá để tạo hóa đơn.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Tháng</label>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">Tháng 9</SelectItem>
                    <SelectItem value="10">Tháng 10</SelectItem>
                    <SelectItem value="11">Tháng 11</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Năm</label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Phạm vi áp dụng</label>
              <Select value={target} onValueChange={setTarget}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toàn trung tâm</SelectItem>
                  <SelectItem value="ielts">Khối IELTS</SelectItem>
                  <SelectItem value="toeic">Khối TOEIC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">Tính học phí thành công</h3>
            <p className="text-sm text-slate-500">Đã tạo 124 hóa đơn nháp mới.</p>
          </div>
        )}

        <DialogFooter>
          {!isSuccess && (
            <>
              <Button variant="outline" onClick={onClose} disabled={isLoading}>
                Hủy
              </Button>
              <Button onClick={handleGenerate} disabled={isLoading} className="bg-blue-600 text-white w-[120px]">
                {isLoading ? <Spinner size="sm" className="text-white" /> : 'Chạy tự động'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
