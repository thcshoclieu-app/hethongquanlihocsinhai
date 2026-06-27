import { RiskScoreRepository } from '@/repositories/RiskScoreRepository';
import { RiskScore } from '@/types';

export class RiskService {
  private repo = new RiskScoreRepository();

  async getRiskScoresByCampus(campusId: string): Promise<RiskScore[]> {
    return this.repo.getAll(); // Simplified for now
  }

  async getRiskScore(studentId: string): Promise<RiskScore | null> {
    const scores = await this.repo.getAll();
    return scores.find(s => s.studentId === studentId) || null;
  }

  // Calculate risk using a rule engine/mock model
  async calculateRisk(studentId: string): Promise<RiskScore> {
    // In a real system, this would call an external ML model or run complex rules
    // Here we generate a mock risk score to simulate the AI
    const riskLevel = Math.random() > 0.8 ? 'HIGH' : Math.random() > 0.5 ? 'MEDIUM' : 'LOW';
    const score: RiskScore = {
      id: `risk_${studentId}`,
      organizationId: 'org_1',
      studentId,
      attendanceRisk: Math.floor(Math.random() * 100),
      paymentRisk: Math.floor(Math.random() * 100),
      participationRisk: Math.floor(Math.random() * 100),
      overallRisk: Math.floor(Math.random() * 100),
      riskLevel: riskLevel as any,
      factors: [
        { name: 'Nghỉ học nhiều', impact: 30, description: 'Nghỉ 3 buổi trong tháng' },
        { name: 'Nợ học phí', impact: 40, description: 'Chưa đóng học phí tháng này' }
      ],
      lastCalculated: new Date().toISOString(),
      version: 'v1.0'
    };
    await this.repo.update(score.id, score);
    return score;
  }
}

export const riskService = new RiskService();
