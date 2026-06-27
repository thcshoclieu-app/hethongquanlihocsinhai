import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileText, Table } from 'lucide-react';
import { ExportService } from '@/services/analytics/ExportService';

export function ExportDialog({ reportName, data, columns }: { reportName: string, data: any[], columns: string[] }) {
  const handleExportExcel = async () => {
    await ExportService.exportToExcel(reportName, data, columns);
    alert('Xuất Excel thành công!');
  };

  const handleExportPDF = async () => {
    await ExportService.exportToPDF(reportName, { data, columns });
    alert('Xuất PDF thành công!');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Download size={16} />
          <span>Xuất báo cáo</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tùy chọn xuất báo cáo</DialogTitle>
          <DialogDescription>Chọn định dạng file bạn muốn tải về.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button variant="outline" className="flex items-center justify-start gap-4 h-14" onClick={handleExportExcel}>
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <Table size={20} />
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-900">Microsoft Excel (.xlsx)</div>
              <div className="text-xs text-slate-500">Phù hợp để phân tích và tính toán thêm</div>
            </div>
          </Button>
          <Button variant="outline" className="flex items-center justify-start gap-4 h-14" onClick={handleExportPDF}>
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-900">Tài liệu PDF (.pdf)</div>
              <div className="text-xs text-slate-500">Phù hợp để in ấn và chia sẻ</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
