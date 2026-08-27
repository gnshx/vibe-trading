/**
 * Reputation Service - Analyzes brand sentiment, institutional trust, media buzz, and controversy.
 */

export function calculateReputationMetrics(company) {
  if (!company || !company.reputation) {
    return null;
  }

  const {
    overallScore,
    brandSentiment,
    mediaBuzz,
    institutionalTrust,
    employeeVibe,
    controversyIndex = 0
  } = company.reputation;

  // Adjusted Vibe Score incorporating controversy penalty
  const netVibeScore = Math.max(
    0,
    Math.min(100, Math.round(overallScore * 0.4 + mediaBuzz * 0.25 + institutionalTrust * 0.25 + employeeVibe * 0.1 - (controversyIndex * 0.15)))
  );

  let reputationTier = 'Exceptional';
  if (netVibeScore < 60) reputationTier = 'High Risk / Unsettled';
  else if (netVibeScore < 75) reputationTier = 'Moderate / Neutral';
  else if (netVibeScore < 88) reputationTier = 'Strong Positive';

  let sentimentBadge = 'Bullish';
  if (controversyIndex > 50) {
    sentimentBadge = 'Polarizing / High Volatility';
  } else if (netVibeScore > 90) {
    sentimentBadge = 'Ultra Bullish Monopoly Vibe';
  }

  return {
    netVibeScore,
    reputationTier,
    sentimentBadge,
    breakdown: {
      overallScore,
      brandSentiment,
      mediaBuzz,
      institutionalTrust,
      employeeVibe,
      controversyIndex
    },
    narrativeSummary: company.reputation.recentNarrative
  };
}
