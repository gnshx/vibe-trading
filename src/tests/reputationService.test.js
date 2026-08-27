import { describe, it, expect } from 'vitest';
import { calculateReputationMetrics } from '../services/reputationService.js';
import { companyDatabase } from '../data/companyDatabase.js';

describe('Reputation Service Engine', () => {
  it('calculates reputation metrics correctly for NVDA', () => {
    const nvda = companyDatabase.find(c => c.symbol === 'NVDA');
    const result = calculateReputationMetrics(nvda);

    expect(result).not.toBeNull();
    expect(result.netVibeScore).toBeGreaterThan(80);
    expect(result.reputationTier).toBe('Exceptional');
    expect(result.breakdown.overallScore).toBe(92);
  });

  it('handles empty or missing company object gracefully', () => {
    expect(calculateReputationMetrics(null)).toBeNull();
    expect(calculateReputationMetrics({})).toBeNull();
  });
});
