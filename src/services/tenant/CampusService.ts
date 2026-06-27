import { Campus } from '@/types';

export class CampusService {
  static async getCampusesByOrg(organizationId: string): Promise<Campus[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'camp_1',
            organizationId,
            name: 'Cơ sở Cầu Giấy',
            code: 'CG',
            address: '100 Xuân Thủy, Cầu Giấy, HN',
            phone: '024 1234 5678',
            managerId: 'mgr_1',
            status: 'ACTIVE'
          },
          {
            id: 'camp_2',
            organizationId,
            name: 'Cơ sở Hà Đông',
            code: 'HD',
            address: '200 Quang Trung, Hà Đông, HN',
            phone: '024 8765 4321',
            managerId: 'mgr_2',
            status: 'ACTIVE'
          }
        ]);
      }, 300);
    });
  }
}
