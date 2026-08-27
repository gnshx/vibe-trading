import { describe, it, expect } from 'vitest';
import { analyzeUpcomingEvents } from '../services/eventTracker.js';
import { companyDatabase } from '../data/companyDatabase.js';

describe('Event Tracker Service Engine', () => {
  it('parses short-term days and long-term years events correctly', () => {
    const pltr = companyDatabase.find(c => c.symbol === 'PLTR');
    const result = analyzeUpcomingEvents(pltr);

    expect(result.daysEvents.length).toBeGreaterThan(0);
    expect(result.yearsEvents.length).toBeGreaterThan(0);
    expect(result.totalEventsCount).toBe(pltr.upcomingEvents.length);
    expect(result.catalystImpactScore).toBeGreaterThan(0);
  });

  it('handles company without events', () => {
    const result = analyzeUpcomingEvents({ symbol: 'TEST' });
    expect(result.totalEventsCount).toBeUndefined();
    expect(result.daysEvents).toEqual([]);
    expect(result.catalystImpactScore).toBe(0);
  });
});
