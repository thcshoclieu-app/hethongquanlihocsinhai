import { SavedReport } from '@/types';

export class ReportService {
  static async getSavedReports(): Promise<SavedReport[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            reportId: 'rep_1',
            name: 'Báo cáo doanh thu tháng',
            description: 'Tổng hợp doanh thu học phí toàn trung tâm theo tháng',
            type: 'revenue',
            config: { groupBy: 'month' },
            isFavorite: true,
            isScheduled: true,
            schedulePattern: '0 0 1 * *', // 1st of every month
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'admin'
          },
          {
            reportId: 'rep_2',
            name: 'Chuyên cần khối IELTS',
            description: 'Tỷ lệ điểm danh của học sinh khối IELTS',
            type: 'attendance',
            config: { classGroup: 'IELTS' },
            isFavorite: false,
            isScheduled: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'teacher_1'
          }
        ]);
      }, 500);
    });
  }
}
