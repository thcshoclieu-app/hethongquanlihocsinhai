import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Invoice } from '@/types';
import { format } from 'date-fns';

interface InvoiceTableProps {
  invoices: Invoice[];
  isLoading: boolean;
  onRowClick: (invoice: Invoice) => void;
}

export function InvoiceTable({ invoices, isLoading, onRowClick }: InvoiceTableProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Đang tải dữ liệu...</div>;
  }

  if (invoices.length === 0) {
    return <div className="p-8 text-center text-slate-500">Chưa có hóa đơn nào</div>;
  }

  return (
    <Table>
      <TableHeader className="sticky top-0 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur z-10 shadow-sm">
        <TableRow>
          <TableHead>Mã HĐ</TableHead>
          <TableHead>Học sinh</TableHead>
          <TableHead>Lớp</TableHead>
          <TableHead>Kỳ thu</TableHead>
          <TableHead>Tổng tiền</TableHead>
          <TableHead>Đã thu</TableHead>
          <TableHead>Còn nợ</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((item) => (
          <TableRow 
            key={item.invoiceId} 
            className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
            onClick={() => onRowClick(item)}
          >
            <TableCell className="font-medium text-slate-500">{item.invoiceId}</TableCell>
            <TableCell className="font-medium text-slate-900 dark:text-slate-100">{item.studentId}</TableCell>
            <TableCell>{item.classId}</TableCell>
            <TableCell>{`${item.month}/${item.year}`}</TableCell>
            <TableCell className="font-medium">{item.total.toLocaleString()}đ</TableCell>
            <TableCell className="text-green-600">{item.paid.toLocaleString()}đ</TableCell>
            <TableCell className="text-orange-600">{item.remaining > 0 ? `${item.remaining.toLocaleString()}đ` : '-'}</TableCell>
            <TableCell>
              {item.status === 'paid' && <Badge variant="success" className="font-normal bg-green-100 text-green-700 hover:bg-green-200 border-none">Đã thanh toán</Badge>}
              {item.status === 'issued' && item.paid > 0 && <Badge variant="warning" className="font-normal bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">Thanh toán 1 phần</Badge>}
              {item.status === 'issued' && item.paid === 0 && <Badge variant="destructive" className="font-normal bg-red-100 text-red-700 hover:bg-red-200 border-none">Chưa thanh toán</Badge>}
              {item.status === 'draft' && <Badge variant="secondary" className="font-normal border-none">Bản nháp</Badge>}
              {item.status === 'cancelled' && <Badge variant="secondary" className="font-normal bg-slate-100 text-slate-500 border-none">Đã hủy</Badge>}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                <MoreHorizontal size={16} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
