import { describe, it, expect } from 'vitest';
import { analyzeUpcomingEvents } from '../services/eventTracker.js';

const mockEventsCompany = {
  symbol: 'PLTR',
  upcomingEvents: [
    { id: '1', timeframe: 'days', impact: 'High', direction: 'Bullish', probability: '80%' },
    { id: '2', timeframe: 'years', impact: 'Extreme', direction: 'Bullish', probability: '85%' }
  ]
};

describe('Event Tracker Service Engine', () => {
  it('parses short-term days and long-term years events correctly', () => {
    const result = analyzeUpcomingEvents(mockEventsCompany);

    expect(result.daysEvents.length).toBe(1);
    expect(result.yearsEvents.length).toBe(1);
    expect(result.totalEventsCount).toBe(2);
    expect(result.catalystImpactScore).toBeGreaterThan(0);
  });

  it('handles company without events', () => {
    const result = analyzeUpcomingEvents({ symbol: 'TEST' });
    expect(result.totalEventsCount).toBe(0);
    expect(result.daysEvents).toEqual([]);
    expect(result.catalystImpactScore).toBe(0);
  });
});
