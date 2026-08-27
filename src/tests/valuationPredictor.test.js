import { describe, it, expect } from 'vitest';
import { predictCompanyValue } from '../services/valuationPredictor.js';

const mockCompany = {
  id: 'NVDA',
  symbol: 'NVDA',
  name: 'NVIDIA Corporation',
  currentPrice: 130.50,
  reputation: {
    overallScore: 90,
    mediaBuzz: 95,
    institutionalTrust: 92,
    employeeVibe: 88,
    controversyIndex: 15
  },
  upcomingEvents: [
    { id: '1', timeframe: 'days', impact: 'High', direction: 'Bullish', probability: '85%' }
  ],
  geopolitics: {
    geopoliticalStabilityScore: 85
  },
  valuation: {
    targetBasePrice: 165.00,
    targetBullPrice: 195.00,
    targetBearPrice: 110.00,
    peRatio: 45,
    revenueGrowthYoY: '50%',
    analystConsensus: 'Strong Buy'
  }
};

describe('Valuation Predictor Service Engine', () => {
  it('generates dynamic value predictions and trajectory series', () => {
    const prediction = predictCompanyValue(mockCompany);

    expect(prediction).not.toBeNull();
    expect(prediction.symbol).toBe('NVDA');
    expect(prediction.dynamicPredictedPrice).toBeGreaterThan(0);
    expect(prediction.trajectory.length).toBe(5);
    expect(prediction.trajectory[0].period).toBe('Current');
    expect(prediction.trajectory[3].period).toBe('12 Months (Target Horizon)');
  });

  it('adjusts prediction when custom scenario multipliers are applied', () => {
    const basePrediction = predictCompanyValue(mockCompany, { catalystWeight: 1.0, geoWeight: 1.0 });
    const boostedPrediction = predictCompanyValue(mockCompany, { catalystWeight: 1.8, geoWeight: 1.5 });

    expect(boostedPrediction.dynamicPredictedPrice).toBeGreaterThan(basePrediction.dynamicPredictedPrice);
  });
});
