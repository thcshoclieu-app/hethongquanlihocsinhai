import { KPI, Invoice, Attendance, Student, Classroom, Teacher } from '@/types';
import { useTenantStore } from '@/store/tenantStore';
import { FeatureFlagService } from '@/services/tenant/FeatureFlagService';
import { SubscriptionService } from '@/services/tenant/SubscriptionService';

export class AnalyticsService {
  private static async validateFeature() {
    const orgId = useTenantStore.getState().organizationId;
    if (!orgId) throw new Error('No active organization');

    const sub = await SubscriptionService.getCurrentSubscription(orgId);
    if (!sub) throw new Error('No active subscription');

    const flags = await FeatureFlagService.getFeatureFlags(sub.planId);
    if (!flags.features.analytics) {
      throw new Error('Feature locked: analytics');
    }
  }

  static async getDashboardKPI(): Promise<KPI> {
    await this.validateFeature();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalStudents: 1245,
          totalClasses: 48,
          totalTeachers: 35,
          presentToday: 1200,
          absentToday: 45,
          lateToday: 12,
          revenueMonth: 145500000,
          debtTotal: 12400000,
          newStudents: 24,
          activeClasses: 45,
          attendanceRate: 96,
          collectionRate: 92,
          averageClassSize: 25.5
        });
      }, 500);
    });
  }

  static async getRevenueData() {
    await this.validateFeature();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: 'Tháng 1', thu: 140, chi: 40 },
          { name: 'Tháng 2', thu: 130, chi: 45 },
          { name: 'Tháng 3', thu: 150, chi: 42 },
          { name: 'Tháng 4', thu: 145, chi: 48 },
          { name: 'Tháng 5', thu: 160, chi: 50 },
          { name: 'Tháng 6', thu: 175, chi: 55 },
        ]);
      }, 500);
    });
  }

  static async getAttendanceData() {
    await this.validateFeature();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: 'Tháng 1', present: 95, absent: 5 },
          { name: 'Tháng 2', present: 96, absent: 4 },
          { name: 'Tháng 3', present: 94, absent: 6 },
          { name: 'Tháng 4', present: 97, absent: 3 },
          { name: 'Tháng 5', present: 95, absent: 5 },
          { name: 'Tháng 6', present: 98, absent: 2 },
        ]);
      }, 500);
    });
  }

  static async getStudentDemographics() {
    await this.validateFeature();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: 'Tiểu học', value: 400 },
          { name: 'THCS', value: 300 },
          { name: 'THPT', value: 300 },
          { name: 'Luyện thi', value: 200 },
        ]);
      }, 500);
    });
  }
}
