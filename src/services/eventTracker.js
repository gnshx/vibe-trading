/**
 * Event Tracker Service - Analyzes upcoming short-term (days), long-term (years), and completed catalyst events.
 */

export function analyzeUpcomingEvents(company) {
  if (!company || !company.upcomingEvents) {
    return {
      daysEvents: [],
      yearsEvents: [],
      upcomingEvents: [],
      completedEvents: [],
      totalEventsCount: 0,
      catalystImpactScore: 0,
      realizedCatalystScore: 0,
      catalystOutlook: 'No Catalysts Logged'
    };
  }

  const allEvents = company.upcomingEvents;
  const upcomingEvents = allEvents.filter(e => e.status !== 'completed');
  const completedEvents = allEvents.filter(e => e.status === 'completed');

  const daysEvents = upcomingEvents.filter(e => e.timeframe === 'days');
  const yearsEvents = upcomingEvents.filter(e => e.timeframe === 'years');

  // Calculate composite catalyst impact score (-100 to +100) for UPCOMING events
  let rawUpcomingScore = 0;
  upcomingEvents.forEach(event => {
    let weight = 10;
    if (event.impact === 'Extreme') weight = 25;
    else if (event.impact === 'High') weight = 18;
    else if (event.impact === 'Medium') weight = 10;

    const probMultiplier = parseFloat(event.probability || '70%') / 100;

    if (event.direction === 'Bullish') {
      rawUpcomingScore += weight * probMultiplier;
    } else if (event.direction === 'Bearish') {
      rawUpcomingScore -= weight * probMultiplier;
    } else {
      rawUpcomingScore += (weight * 0.2) * probMultiplier;
    }
  });

  // Calculate realized catalyst score from COMPLETED events
  let rawCompletedScore = 0;
  completedEvents.forEach(event => {
    let outcomeVal = 10;
    if (event.outcome === 'Bullish Beat' || event.outcome === 'Exceeded Expectations') outcomeVal = 20;
    else if (event.outcome === 'Bearish Miss' || event.outcome === 'Negative Outcome') outcomeVal = -20;
    else if (event.outcome === 'Met Expectations') outcomeVal = 5;

    rawCompletedScore += outcomeVal;
  });

  const catalystImpactScore = Math.min(100, Math.max(-100, Math.round(rawUpcomingScore)));
  const realizedCatalystScore = Math.min(50, Math.max(-50, Math.round(rawCompletedScore)));

  let catalystOutlook = 'Mixed Catalyst Risk';
  if (catalystImpactScore > 20) catalystOutlook = 'Strong Catalyst Tailwinds';
  else if (catalystImpactScore > 0) catalystOutlook = 'Positive Catalysts';

  return {
    allEvents,
    upcomingEvents,
    completedEvents,
    daysEvents,
    yearsEvents,
    totalEventsCount: allEvents.length,
    upcomingEventsCount: upcomingEvents.length,
    completedEventsCount: completedEvents.length,
    catalystImpactScore,
    realizedCatalystScore,
    catalystOutlook
  };
}
