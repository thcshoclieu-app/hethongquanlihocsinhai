import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Plus, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { useBilling } from '@/features/tuition/hooks/useBilling';
import { InvoiceTable } from '@/features/tuition/components/InvoiceTable';
import { BillingRunDialog } from '@/features/tuition/components/BillingRunDialog';
import { InvoiceDetailDialog } from '@/features/tuition/components/InvoiceDetailDialog';
import { PaymentDialog } from '@/features/tuition/components/PaymentDialog';
import { Invoice, InvoiceItem } from '@/types';

export default function Tuition() {
  const { invoices, isLoading } = useBilling();
  const [isBillingRunOpen, setIsBillingRunOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  // Dummy items for now
  const mockItems: InvoiceItem[] = [
    { itemId: '1', invoiceId: selectedInvoice?.invoiceId || '', description: 'Học phí tháng 10', quantity: 1, unitPrice: 1500000, amount: 1500000 }
  ];

  // Calculate metrics
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const totalRemaining = invoices.reduce((sum, inv) => sum + inv.remaining, 0);
  const completionRate = totalAmount > 0 ? Math.round((totalPaid / totalAmount) * 100) : 0;
  const unpaidCount = invoices.filter(inv => inv.remaining > 0).length;

  const handleInvoiceClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailOpen(true);
  };

  const handlePayClick = (invoice: Invoice) => {
    setIsDetailOpen(false);
    setSelectedInvoice(invoice);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentOpen(false);
    // Refresh data logic here
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 h-full flex flex-col p-4 md:p-6 max-w-[1600px] mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Học phí & Hóa đơn</h2>
          <p className="text-slate-500 dark:text-slate-400">Quản lý các đợt thu, hóa đơn và công nợ học sinh.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            <span className="hidden sm:inline">Xuất Excel</span>
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setIsBillingRunOpen(true)}>
            <Plus size={16} />
            <span>Tạo hóa đơn</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 shrink-0">
        <Card>
          <CardContent className="p-4 flex flex-col gap-1">
            <p className="text-sm font-medium text-slate-500">Tổng doanh thu</p>
            <h4 className="text-2xl font-bold text-blue-600">{totalAmount.toLocaleString()} đ</h4>
            <p className="text-xs text-green-600">Đã thu: {totalPaid.toLocaleString()} đ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col gap-1">
            <p className="text-sm font-medium text-slate-500">Công nợ</p>
            <h4 className="text-2xl font-bold text-orange-600">{totalRemaining.toLocaleString()} đ</h4>
            <p className="text-xs text-slate-500">{unpaidCount} hóa đơn chưa hoàn thành</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col gap-1">
            <p className="text-sm font-medium text-slate-500">Tỷ lệ hoàn thành</p>
            <h4 className="text-2xl font-bold text-green-600">{completionRate}%</h4>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${completionRate}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2 max-w-sm w-full">
              <SearchInput placeholder="Tìm kiếm mã, tên học sinh..." />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="10/2023">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Kỳ thu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10/2023">Tháng 10/2023</SelectItem>
                  <SelectItem value="09/2023">Tháng 09/2023</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="paid">Đã thanh toán</SelectItem>
                  <SelectItem value="issued">Chưa thanh toán</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-auto">
          <InvoiceTable invoices={invoices} isLoading={isLoading} onRowClick={handleInvoiceClick} />
        </CardContent>
      </Card>

      <BillingRunDialog isOpen={isBillingRunOpen} onClose={() => setIsBillingRunOpen(false)} />
      <InvoiceDetailDialog 
        invoice={selectedInvoice} 
        items={mockItems} 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        onPay={handlePayClick} 
      />
      <PaymentDialog 
        invoice={selectedInvoice} 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        onSuccess={handlePaymentSuccess} 
      />
    </motion.div>
  );
}
