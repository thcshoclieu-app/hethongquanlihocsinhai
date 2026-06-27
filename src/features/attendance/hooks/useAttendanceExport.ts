import { Attendance } from '@/types';

export function useAttendanceExport() {
  const exportToCSV = (attendances: Attendance[], className: string) => {
    if (!attendances || attendances.length === 0) {
      alert('Không có dữ liệu để xuất');
      return;
    }

    const headers = ['Mã HS', 'Lớp', 'Ngày', 'Giờ', 'Trạng thái', 'Phương thức', 'Độ tin cậy', 'Ghi chú'];
    const rows = attendances.map(a => [
      a.studentId,
      a.classId,
      a.date,
      a.time,
      a.status,
      a.method || 'AI',
      a.confidence ? `${a.confidence}%` : '',
      a.note || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `DiemDanh_${className}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { exportToCSV };
}
