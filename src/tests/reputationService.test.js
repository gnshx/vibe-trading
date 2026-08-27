import { describe, it, expect } from 'vitest';
import { calculateReputationMetrics } from '../services/reputationService.js';

describe('Reputation Service Engine', () => {
  it('calculates reputation metrics correctly from company research object', () => {
    const mockData = {
      profile: { name: 'NVIDIA Corporation' },
      news: [
        { headline: 'NVIDIA achieves record growth and AI surge', summary: 'Strong beat in revenue' }
      ],
      recommendations: [{ strongBuy: 25, buy: 10, hold: 2, sell: 0 }]
    };
    const result = calculateReputationMetrics(mockData);

    expect(result).not.toBeNull();
    expect(result.netVibeScore).toBeGreaterThan(60);
    expect(result.sentimentBadge).toBeDefined();
  });

  it('handles empty or missing company object gracefully', () => {
    expect(calculateReputationMetrics(null)).toBeNull();
    expect(calculateReputationMetrics({})).toBeNull();
  });
});
