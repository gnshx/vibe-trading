import { describe, it, expect } from 'vitest';
import { predictCompanyValue } from '../services/valuationPredictor.js';
import { companyDatabase } from '../data/companyDatabase.js';

describe('Valuation Predictor Service Engine', () => {
  it('generates dynamic value predictions and trajectory series', () => {
    const tsla = companyDatabase.find(c => c.symbol === 'TSLA');
    const prediction = predictCompanyValue(tsla);

    expect(prediction).not.toBeNull();
    expect(prediction.symbol).toBe('TSLA');
    expect(prediction.dynamicPredictedPrice).toBeGreaterThan(0);
    expect(prediction.trajectory.length).toBe(5);
    expect(prediction.trajectory[0].period).toBe('Current');
    expect(prediction.trajectory[3].period).toBe('12 Months (Target Horizon)');
  });

  it('adjusts prediction when custom scenario multipliers are applied', () => {
    const nvda = companyDatabase.find(c => c.symbol === 'NVDA');
    const basePrediction = predictCompanyValue(nvda, { catalystWeight: 1.0, geoWeight: 1.0 });
    const boostedPrediction = predictCompanyValue(nvda, { catalystWeight: 1.8, geoWeight: 1.5 });

    expect(boostedPrediction.dynamicPredictedPrice).toBeGreaterThan(basePrediction.dynamicPredictedPrice);
  });
});
