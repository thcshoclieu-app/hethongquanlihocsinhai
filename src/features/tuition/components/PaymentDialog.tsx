import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Invoice } from '@/types';

interface PaymentDialogProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentDialog({ invoice, isOpen, onClose, onSuccess }: PaymentDialogProps) {
  const [amount, setAmount] = useState<string>('');
  const [method, setMethod] = useState('transfer');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (invoice) {
      setAmount(invoice.remaining.toString());
    }
  }, [invoice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1000);
  };

  if (!invoice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ghi nhận thanh toán</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg flex justify-between items-center text-sm">
            <span className="text-slate-500">Số tiền cần thu:</span>
            <span className="font-bold text-orange-600 text-lg">{invoice.remaining.toLocaleString()} đ</span>
          </div>

          <div className="grid gap-2">
            <label htmlFor="amount" className="text-sm font-medium">Số tiền thu thực tế *</label>
            <Input 
              id="amount" 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="Nhập số tiền..."
              required
              max={invoice.remaining}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="method" className="text-sm font-medium">Phương thức *</label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="method">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transfer">Chuyển khoản</SelectItem>
                <SelectItem value="cash">Tiền mặt</SelectItem>
                <SelectItem value="qr">Quét mã QR</SelectItem>
                <SelectItem value="ewallet">Ví điện tử</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="note" className="text-sm font-medium">Ghi chú (Tùy chọn)</label>
            <Input 
              id="note" 
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
              placeholder="Ví dụ: Phụ huynh chuyển khoản VCB..."
            />
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 text-white min-w-[120px]">
              {isLoading ? <Spinner size="sm" className="text-white" /> : 'Xác nhận thu'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
