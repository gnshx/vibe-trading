/**
 * Geopolitical Service - Analyzes corporate tie-ups, political leader relationships, country stability, and market time zone dynamics.
 */

export function analyzeGeopoliticsAndTieUps(company) {
  if (!company) {
    return null;
  }

  const { tieUps = [], geopolitics = {} } = company;
  const { primaryCountry, keyLeaderRelations = [], regulatoryRisk, geopoliticalStabilityScore = 80, timezoneEffect } = geopolitics;

  // Strategic Tie-up strength score (0-100)
  const tieUpCount = tieUps.length;
  const tieUpScore = Math.min(100, tieUpCount * 30);

  // Calculate net political alignment score
  let totalLeaderImpact = 0;
  keyLeaderRelations.forEach(rel => {
    if (rel.relationship.includes('Ally') || rel.relationship.includes('Partner') || rel.relationship.includes('Influence')) {
      totalLeaderImpact += 25;
    } else if (rel.relationship.includes('Challenging') || rel.relationship.includes('Scrutiny') || rel.relationship.includes('Complex')) {
      totalLeaderImpact += 5;
    } else {
      totalLeaderImpact += 15;
    }
  });

  const leaderAlignmentScore = keyLeaderRelations.length > 0
    ? Math.min(100, Math.round(totalLeaderImpact / keyLeaderRelations.length * 3.5))
    : 70;

  const compositeGeopoliticalScore = Math.round(
    (geopoliticalStabilityScore * 0.4) + (leaderAlignmentScore * 0.35) + (tieUpScore * 0.25)
  );

  return {
    primaryCountry,
    tieUps,
    tieUpScore,
    keyLeaderRelations,
    leaderAlignmentScore,
    geopoliticalStabilityScore,
    compositeGeopoliticalScore,
    regulatoryRisk,
    timezoneEffect,
    summary: `${company.symbol} maintains ${tieUpCount} key corporate strategic alliances with strong reliance on ${primaryCountry} regulatory alignment.`
  };
}
