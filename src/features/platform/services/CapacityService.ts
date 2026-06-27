// Mock service for Capacity Planning
export class CapacityService {
  async getForecasts() {
    return {
      storage: {
        current: 500, // GB
        projected3Months: 650,
        trend: 'UP',
      },
      apiUsage: {
        current: 1200000,
        projected3Months: 2000000,
        trend: 'UP',
      },
      userGrowth: {
        current: 15000,
        projected3Months: 18000,
        trend: 'UP',
      }
    };
  }
}

export const capacityService = new CapacityService();
