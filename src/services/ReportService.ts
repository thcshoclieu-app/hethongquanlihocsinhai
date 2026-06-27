import { MonthlyReportRepository } from '../repositories/MonthlyReportRepository';
import { MonthlyReport } from '../types';

export class ReportService {
  static async getReports(): Promise<MonthlyReport[]> {
    return MonthlyReportRepository.getAll();
  }

  static async getReport(id: string): Promise<MonthlyReport | null> {
    return MonthlyReportRepository.getById(id);
  }

  static async createReport(data: Partial<MonthlyReport>): Promise<void> {
    const id = data.reportId || crypto.randomUUID();
    await MonthlyReportRepository.create(id, { ...data, reportId: id, createdAt: new Date().toISOString() });
  }

  static async deleteReport(id: string): Promise<void> {
    await MonthlyReportRepository.delete(id);
  }
}
