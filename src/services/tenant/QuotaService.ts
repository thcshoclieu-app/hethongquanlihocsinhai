import { Quota } from '@/types';

export class QuotaService {
  static async getCurrentQuota(organizationId: string): Promise<Quota> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          organizationId,
          studentLimit: 5000,
          teacherLimit: 100,
          storageLimit: 100 * 1024 * 1024 * 1024, // 100GB
          aiRecognitionLimit: 50000,
          currentStudents: 1245,
          currentTeachers: 48,
          currentStorage: 12 * 1024 * 1024 * 1024, // 12GB
          currentAiUsage: 15420
        });
      }, 300);
    });
  }
}
