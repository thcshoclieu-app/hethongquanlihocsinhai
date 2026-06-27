import { useState, useEffect } from 'react';
import { riskService } from '../services/RiskService';
import { recommendationService } from '../services/RecommendationService';
import { trendAnalysisService } from '../services/TrendAnalysisService';
import { insightService } from '../services/InsightService';
import { RiskScore, Recommendation, InsightSnapshot, AiConfiguration } from '@/types';
import { useTenantStore } from '@/store/tenantStore';

export function useRiskScores(campusId?: string) {
  const [scores, setScores] = useState<RiskScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const res = await riskService.getRiskScoresByCampus(campusId || '');
      setScores(res);
      setIsLoading(false);
    }
    load();
  }, [campusId]);

  return { scores, isLoading };
}

export function useRecommendations() {
  const { organizationId } = useTenantStore();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (organizationId) {
        setIsLoading(true);
        const res = await recommendationService.getRecommendations(organizationId);
        setRecommendations(res);
        setIsLoading(false);
      }
    }
    load();
  }, [organizationId]);

  return { recommendations, isLoading };
}

export function useTrends(type: string, period: string) {
  const { organizationId } = useTenantStore();
  const [trends, setTrends] = useState<InsightSnapshot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (organizationId) {
        setIsLoading(true);
        const res = await trendAnalysisService.getTrends(organizationId, type, period);
        setTrends(res);
        setIsLoading(false);
      }
    }
    load();
  }, [organizationId, type, period]);

  return { trends, isLoading };
}

export function useInsightConfiguration() {
  const { organizationId } = useTenantStore();
  const [config, setConfig] = useState<AiConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (organizationId) {
        setIsLoading(true);
        const res = await insightService.getConfiguration(organizationId);
        setConfig(res);
        setIsLoading(false);
      }
    }
    load();
  }, [organizationId]);

  return { config, isLoading };
}
