/**
 * Valuation Predictor Service - Synthesizes reputation, event catalysts, tie-ups, and geopolitical alignment into value predictions.
 */

import { calculateReputationMetrics } from './reputationService.js';
import { analyzeUpcomingEvents } from './eventTracker.js';
import { analyzeGeopoliticsAndTieUps } from './geopoliticalService.js';

export function predictCompanyValue(company, customScenario = { catalystWeight: 1.0, geoWeight: 1.0 }) {
  if (!company || !company.valuation) {
    return null;
  }

  const reputationRes = calculateReputationMetrics(company);
  const eventsRes = analyzeUpcomingEvents(company);
  const geoRes = analyzeGeopoliticsAndTieUps(company);

  const currentPrice = company.currentPrice;
  const { targetBasePrice, targetBullPrice, targetBearPrice, peRatio, revenueGrowthYoY } = company.valuation;

  // Composite Vibe Multiplier calculated from reputation, catalysts, and geopolitics
  const vibeScore = reputationRes ? reputationRes.netVibeScore : 80;
  const catalystScore = eventsRes ? eventsRes.catalystImpactScore : 0;
  const geoScore = geoRes ? geoRes.compositeGeopoliticalScore : 80;

  // Composite factor calculation
  const compositeFactor = (
    (vibeScore * 0.45) +
    (catalystScore * 0.3 * (customScenario.catalystWeight || 1.0)) +
    (geoScore * 0.25 * (customScenario.geoWeight || 1.0))
  );

  // Expected 12-Month Projected Price Adjustment
  const percentageAdjustment = ((compositeFactor - 50) / 100) * 0.35; // max +/- 35% tilt
  const dynamicPredictedPrice = Number((targetBasePrice * (1 + percentageAdjustment)).toFixed(2));

  // Trajectory timeline generation (Current -> 3M -> 6M -> 12M -> 24M)
  const trajectory = [
    { period: 'Current', price: currentPrice, sentiment: 'Base Market' },
    { period: '3 Months (Short Term Catalysts)', price: Number((currentPrice + (dynamicPredictedPrice - currentPrice) * 0.3).toFixed(2)), sentiment: eventsRes.catalystOutlook },
    { period: '6 Months (Mid Term Rollout)', price: Number((currentPrice + (dynamicPredictedPrice - currentPrice) * 0.65).toFixed(2)), sentiment: reputationRes.reputationTier },
    { period: '12 Months (Target Horizon)', price: dynamicPredictedPrice, sentiment: 'Vibe Target Price' },
    { period: '24 Months (Strategic Multi-Year)', price: Number((dynamicPredictedPrice * (1 + (catalystScore > 0 ? 0.15 : 0.05))).toFixed(2)), sentiment: 'Long Term Expansion' }
  ];

  const valuationRating = dynamicPredictedPrice > currentPrice * 1.15
    ? 'High Growth / Strong Buy Vibe'
    : dynamicPredictedPrice > currentPrice
    ? 'Moderate Upside'
    : 'Fairly Valued / Hold Vibe';

  return {
    symbol: company.symbol,
    companyName: company.name,
    currentPrice,
    targetBasePrice,
    targetBullPrice,
    targetBearPrice,
    dynamicPredictedPrice,
    impliedUpsidePercentage: Number((((dynamicPredictedPrice - currentPrice) / currentPrice) * 100).toFixed(1)),
    valuationRating,
    compositeFactor: Number(compositeFactor.toFixed(1)),
    trajectory,
    fundamentalStats: {
      peRatio,
      revenueGrowthYoY,
      analystConsensus: company.valuation.analystConsensus
    }
  };
}
