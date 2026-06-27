import { BaseRepository } from './BaseRepository';
import { MonthlyReport } from '../types';
import { COLLECTIONS } from '../constants/collections';

class MonthlyReportRepositoryClass extends BaseRepository<MonthlyReport> {
  constructor() {
    super(COLLECTIONS.MONTHLY_REPORTS, 'reportId');
  }
}

export const MonthlyReportRepository = new MonthlyReportRepositoryClass();
