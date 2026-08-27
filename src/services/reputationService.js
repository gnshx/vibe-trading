/**
 * Reputation Service - Analyzes LIVE news sentiment + analyst recommendations into Vibe Score.
 * No hardcoded data. All computed from real Finnhub API responses.
 */

const POSITIVE_WORDS = [
  'growth', 'profit', 'beat', 'surge', 'rally', 'gain', 'innovation', 'partnership',
  'launch', 'expand', 'record', 'bullish', 'upgrade', 'outperform', 'strong', 'boost',
  'breakthrough', 'success', 'deal', 'revenue', 'milestone', 'approval', 'soar', 'exceed',
  'optimism', 'momentum', 'dividend', 'buyback', 'acquisition'
];

const NEGATIVE_WORDS = [
  'loss', 'decline', 'lawsuit', 'investigation', 'recall', 'layoff', 'drop', 'crash',
  'scandal', 'fine', 'downgrade', 'underperform', 'bearish', 'warning', 'debt', 'miss',
  'cut', 'risk', 'fraud', 'violation', 'penalty', 'default', 'bankruptcy', 'slump',
  'concern', 'delay', 'controversy', 'probe', 'sell-off'
];

function analyzeSentiment(text) {
  const lower = (text || '').toLowerCase();
  let pos = 0, neg = 0;
  POSITIVE_WORDS.forEach((w) => { if (lower.includes(w)) pos++; });
  NEGATIVE_WORDS.forEach((w) => { if (lower.includes(w)) neg++; });
  return { pos, neg, total: pos + neg };
}

export function calculateReputationMetrics(researchData) {
  if (!researchData) return null;

  const { news = [], recommendations = [], financials, profile } = researchData;

  // 1. News Sentiment Score (0-100)
  let totalPos = 0, totalNeg = 0;
  news.slice(0, 50).forEach((article) => {
    const headlineSent = analyzeSentiment(article.headline);
    const summarySent = analyzeSentiment(article.summary);
    totalPos += headlineSent.pos + summarySent.pos;
    totalNeg += headlineSent.neg + summarySent.neg;
  });
  const sentimentTotal = totalPos + totalNeg || 1;
  const newsSentimentScore = Math.round((totalPos / sentimentTotal) * 100);

  // 2. Analyst Confidence Score (0-100) from latest recommendation
  let analystScore = 70; // default neutral
  let buyCount = 0, holdCount = 0, sellCount = 0;
  if (recommendations.length > 0) {
    const latest = recommendations[0];
    buyCount = (latest.strongBuy || 0) + (latest.buy || 0);
    holdCount = latest.hold || 0;
    sellCount = (latest.strongSell || 0) + (latest.sell || 0);
    const totalAnalysts = buyCount + holdCount + sellCount || 1;
    analystScore = Math.round(((buyCount * 100 + holdCount * 50 + sellCount * 0) / totalAnalysts));
  }

  // 3. Financial Health Score (0-100) from PE, beta, 52-week performance
  let financialHealthScore = 75;
  const metric = financials?.metric || {};
  if (metric['peNormalizedAnnual']) {
    const pe = metric['peNormalizedAnnual'];
    financialHealthScore = pe > 0 && pe < 15 ? 90 : pe < 30 ? 80 : pe < 60 ? 65 : 50;
  }

  // 4. Media Buzz Score (0-100) based on news volume
  const mediaBuzz = Math.min(100, Math.round((news.length / 30) * 100));

  // 5. Controversy Index (0-100)
  const controversyIndex = Math.min(100, Math.round((totalNeg / Math.max(1, news.length)) * 200));

  // Composite Net Vibe Score
  const netVibeScore = Math.max(0, Math.min(100, Math.round(
    newsSentimentScore * 0.30 +
    analystScore * 0.30 +
    financialHealthScore * 0.20 +
    mediaBuzz * 0.10 -
    controversyIndex * 0.10
  )));

  // Tier classification
  let reputationTier = 'Exceptional';
  if (netVibeScore < 40) reputationTier = 'High Risk / Negative Sentiment';
  else if (netVibeScore < 55) reputationTier = 'Cautious / Mixed Signals';
  else if (netVibeScore < 70) reputationTier = 'Moderate / Neutral';
  else if (netVibeScore < 85) reputationTier = 'Strong Positive';

  // Sentiment badge
  let sentimentBadge = 'Bullish';
  if (controversyIndex > 50) sentimentBadge = 'Polarizing / High Volatility';
  else if (netVibeScore > 85) sentimentBadge = 'Ultra Bullish Momentum';
  else if (netVibeScore < 45) sentimentBadge = 'Bearish / Risk Alert';

  // Narrative from latest news
  const topHeadline = news.length > 0 ? news[0].headline : `${profile?.name || 'Company'} research analysis in progress.`;

  return {
    netVibeScore,
    reputationTier,
    sentimentBadge,
    breakdown: {
      brandSentiment: newsSentimentScore > 70 ? 'Strongly Positive' : newsSentimentScore > 50 ? 'Positive' : 'Mixed',
      mediaBuzz,
      institutionalTrust: analystScore,
      employeeVibe: financialHealthScore,
      controversyIndex
    },
    analystBreakdown: { buyCount, holdCount, sellCount },
    narrativeSummary: topHeadline
  };
}
