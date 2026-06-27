import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Invoice, InvoiceItem } from '@/types';
import { Printer, Download, CreditCard, RotateCcw } from 'lucide-react';

interface InvoiceDetailDialogProps {
  invoice: Invoice | null;
  items: InvoiceItem[];
  isOpen: boolean;
  onClose: () => void;
  onPay: (invoice: Invoice) => void;
}

export function InvoiceDetailDialog({ invoice, items, isOpen, onClose, onPay }: InvoiceDetailDialogProps) {
  if (!invoice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between pr-8">
            <DialogTitle>Chi tiết hóa đơn #{invoice.invoiceId}</DialogTitle>
            <Badge variant={invoice.status === 'paid' ? 'success' : invoice.status === 'issued' ? 'warning' : 'secondary'}>
              {invoice.status === 'paid' ? 'Đã thanh toán' : invoice.status === 'issued' ? 'Đã phát hành' : invoice.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="py-4 grid gap-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 mb-1">Mã học sinh</p>
              <p className="font-medium text-slate-900 dark:text-slate-100">{invoice.studentId}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Lớp</p>
              <p className="font-medium text-slate-900 dark:text-slate-100">{invoice.classId}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Kỳ thu</p>
              <p className="font-medium text-slate-900 dark:text-slate-100">{invoice.month}/{invoice.year}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Hạn thanh toán</p>
              <p className="font-medium text-slate-900 dark:text-slate-100">{invoice.dueDate}</p>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b">
                <tr>
                  <th className="text-left font-medium p-3 text-slate-500">Nội dung</th>
                  <th className="text-right font-medium p-3 text-slate-500 w-16">SL</th>
                  <th className="text-right font-medium p-3 text-slate-500 w-32">Đơn giá</th>
                  <th className="text-right font-medium p-3 text-slate-500 w-32">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.length > 0 ? (
                  items.map((item, idx) => (
                    <tr key={idx} className="bg-white dark:bg-slate-950">
                      <td className="p-3">{item.description}</td>
                      <td className="p-3 text-right">{item.quantity}</td>
                      <td className="p-3 text-right">{item.unitPrice.toLocaleString()}đ</td>
                      <td className="p-3 text-right">{item.amount.toLocaleString()}đ</td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white dark:bg-slate-950">
                    <td className="p-3">Học phí tháng {invoice.month}/{invoice.year}</td>
                    <td className="p-3 text-right">1</td>
                    <td className="p-3 text-right">{invoice.subtotal.toLocaleString()}đ</td>
                    <td className="p-3 text-right">{invoice.subtotal.toLocaleString()}đ</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end text-sm">
            <div className="w-64 grid gap-2">
              <div className="flex justify-between text-slate-500">
                <span>Tổng tiền học:</span>
                <span>{invoice.subtotal.toLocaleString()} đ</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Giảm giá:</span>
                  <span className="text-red-600">-{invoice.discount.toLocaleString()} đ</span>
                </div>
              )}
              {invoice.scholarshipAmount > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Học bổng:</span>
                  <span className="text-red-600">-{invoice.scholarshipAmount.toLocaleString()} đ</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base pt-2 border-t mt-2">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">{invoice.total.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Đã thanh toán:</span>
                <span>{invoice.paid.toLocaleString()} đ</span>
              </div>
              {invoice.remaining > 0 && (
                <div className="flex justify-between text-orange-600 font-bold pt-2 border-t mt-2">
                  <span>Còn lại:</span>
                  <span>{invoice.remaining.toLocaleString()} đ</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2 mr-auto">
            <Button variant="outline" size="icon" title="In PDF">
              <Printer size={16} />
            </Button>
            <Button variant="outline" size="icon" title="Tải xuống">
              <Download size={16} />
            </Button>
            {invoice.paid > 0 && (
              <Button variant="outline" size="icon" title="Hoàn tiền" className="text-orange-600 hover:text-orange-700">
                <RotateCcw size={16} />
              </Button>
            )}
          </div>
          <Button variant="outline" onClick={onClose}>Đóng</Button>
          {invoice.status !== 'paid' && (
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => onPay(invoice)}>
              <CreditCard size={16} />
              Ghi nhận thanh toán
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
