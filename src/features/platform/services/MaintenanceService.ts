// Mock service for Maintenance Mode
export class MaintenanceService {
  private isMaintenanceMode = false;

  async getStatus() {
    return {
      enabled: this.isMaintenanceMode,
      message: 'Hệ thống đang bảo trì theo lịch để nâng cấp database.',
      estimatedEndTime: new Date(Date.now() + 3600000).toISOString()
    };
  }

  async toggleMaintenance(enabled: boolean) {
    this.isMaintenanceMode = enabled;
  }
}

export const maintenanceService = new MaintenanceService();
