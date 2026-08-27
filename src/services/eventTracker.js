/**
 * Event Tracker Service - Analyzes upcoming short-term (days) and long-term (years) catalyst events.
 */

export function analyzeUpcomingEvents(company) {
  if (!company || !company.upcomingEvents) {
    return { daysEvents: [], yearsEvents: [], catalystImpactScore: 0 };
  }

  const events = company.upcomingEvents;
  const daysEvents = events.filter(e => e.timeframe === 'days');
  const yearsEvents = events.filter(e => e.timeframe === 'years');

  // Calculate composite catalyst impact score (-100 to +100)
  let rawScore = 0;
  events.forEach(event => {
    let weight = 10;
    if (event.impact === 'Extreme') weight = 25;
    else if (event.impact === 'High') weight = 18;
    else if (event.impact === 'Medium') weight = 10;

    const probMultiplier = parseFloat(event.probability || '70%') / 100;

    if (event.direction === 'Bullish') {
      rawScore += weight * probMultiplier;
    } else if (event.direction === 'Bearish') {
      rawScore -= weight * probMultiplier;
    } else {
      rawScore += (weight * 0.2) * probMultiplier;
    }
  });

  const catalystImpactScore = Math.min(100, Math.max(-100, Math.round(rawScore)));

  return {
    daysEvents,
    yearsEvents,
    totalEventsCount: events.length,
    catalystImpactScore,
    catalystOutlook: catalystImpactScore > 20 ? 'Strong Catalyst Tailwinds' : catalystImpactScore > 0 ? 'Positive Catalysts' : 'Mixed Catalyst Risk'
  };
}
