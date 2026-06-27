import { Organization } from '@/types';

export class OrganizationService {
  static async getCurrentOrganization(): Promise<Organization> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'org_1',
          name: 'Hệ thống Giáo dục Alpha',
          shortName: 'Alpha Edu',
          logo: '/logo192.png',
          email: 'contact@alpha.edu.vn',
          phone: '1900 1234',
          address: '123 Nguyễn Văn Linh',
          country: 'VN',
          timezone: 'Asia/Ho_Chi_Minh',
          currency: 'VND',
          language: 'vi',
          ownerId: 'user_1',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          branding: {
            primaryColor: '#2563eb',
            appName: 'Alpha Manager'
          },
          domain: 'app.alpha.edu.vn'
        });
      }, 300);
    });
  }
}
